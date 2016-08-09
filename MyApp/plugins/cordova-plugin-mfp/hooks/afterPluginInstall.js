// Licensed Materials - Property of IBM
// 5725-I43 (C) Copyright IBM Corp. 2015. All Rights Reserved.
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with IBM Corp.

/*
 * Runs after plugin install
 * For Android, copies over CordovaApp.java to be merged manually with the user's main Cordova activity
 */

var path = require('path'),
    fs = require('fs'),
	child = require('child_process'),
    shell = require('shelljs'),
    et = require('elementtree')
    strings = require('strings'),
    externalizedStrings = require('./externalizedStrings');

module.exports = function(context) {

    if (context.hook === 'after_plugin_install') {
      return afterPluginInstall(context);
    }
};

/* returns www dir for specific platform */
function Parser(platformId, platformPath){
    this.platformId = platformId;
    this.platformPath = platformPath;
}

Parser.prototype.www_dir = function(){
    var www = this.platformId === 'android' ? path.join(this.platformPath, 'assets','www') : path.join(this.platformPath, 'www');
    return www;
}

function afterPluginInstall(context) {
  console.log(externalizedStrings.pluginInstallComplete);

  var platformPath;
  var currentPlatforms = context.opts.cordova.platforms;
  var projectRoot = path.resolve(context.opts.projectRoot);
  var pluginDir = context.opts.plugin.dir;

  currentPlatforms.forEach(function(platformId) {
    platformPath = path.join(projectRoot, 'platforms', platformId);

    if (platformId === 'android') {
      var manifestFile = fs.readFileSync(path.join(platformPath, 'AndroidManifest.xml')).toString();
      var manifest = et.parse(manifestFile);
      var orig_pkg = manifest.getroot().attrib.package;
      var orig_pkgDir = path.join(platformPath, 'src', path.join.apply(null, orig_pkg.split('.')));
      var srcFilePath = path.join(projectRoot, 'plugins/cordova-plugin-mfp/src/android');

	  // Finds java files that could be the CordovaActivity
      var java_files = fs.readdirSync(orig_pkgDir).filter(function(f) {
        return f.indexOf('.svn') == -1 && f.indexOf('.java') >= 0 && fs.readFileSync(path.join(orig_pkgDir, f), 'utf-8').match(/extends\s+CordovaActivity/);
      });

	  // Picks the first file found as the main CordovaActivity
      if (java_files.length === 0) {
        throw new Error('No Java files found which extend CordovaActivity.');
      } else if(java_files.length > 1) {
        events.emit('log', 'Multiple candidate Java files (.java files which extend CordovaActivity) found. Guessing at the first one, ' + java_files[0]);
      }

      var orig_java_class = java_files[0];

	  // Renames the main CordovaActivity
      fs.rename(path.join(orig_pkgDir, orig_java_class), orig_pkgDir + path.sep + 'MainActivity.original', function(err) {
        if ( err ) console.log(err);
        
	        var srcFiles = ['CordovaApp.java', 'GCMIntentService.java', 'ForegroundService.java'];
	        
	        // Copy MFP src files to Android src package directory
	        // Replace package name in src files
	        for (var i = 0; i < srcFiles.length; i++) {
	        	shell.cp('-f', path.join(srcFilePath, srcFiles[i]), orig_pkgDir);
	        	shell.sed('-i', 'package ${packageName}', 'package ' + orig_pkg, orig_pkgDir + path.sep + srcFiles[i]);
	        }
	
	        console.log(strings.format(externalizedStrings.manuallyMergeMainAct, orig_java_class));
      });

        // Removing conflicts in strings.xml
        removeConflictXml(platformPath);
    }
    else if (platformId === 'ios') {
        // iOS-specific: update main() to use WLMyAppDelegate
        var cdvProjName = fs.readdirSync(platformPath).filter(function(e) { return e.match(/\.xcodeproj$/i); })[0];
        cdvProjName = cdvProjName.substring(0, cdvProjName.indexOf('.xcodeproj'));
        var wlMainFile = path.join(pluginDir, 'src', 'ios', 'main.m');
        var cdvMainFile = path.join(platformPath, cdvProjName, 'main.m');
        var cdvMainFileBackup = cdvMainFile + '.bak';
        if (!shell.test('-f', cdvMainFileBackup)){
            //make a backup of original main.m before replacing with Worklight's version
            copyFile(cdvMainFile, cdvMainFileBackup);
        }
        copyFile(wlMainFile, cdvMainFile);

        console.log(externalizedStrings.manuallyMergeMainM);

        //Copy .wldata and buildtime.sh to project root
        var srcFile = path.join(pluginDir, 'src', 'ios', '.wldata');
        if (fs.existsSync(srcFile)) {
            copyFile(srcFile, platformPath);
        }
        srcFile = path.join(pluginDir, 'src', 'ios', 'buildtime.sh');
        if (fs.existsSync(srcFile)) {
            copyFile(srcFile, platformPath);
        }
    }
  });
}

function copyFile(wlFile, cdvFile) {
  shell.mkdir('-p', path.dirname(cdvFile));
  // dest file may already exist as read-only
  if (shell.test('-f', cdvFile)) {
    shell.chmod('u+w', cdvFile);
  }
  shell.cp('-f', wlFile, cdvFile);
}

/* Given an xml file, parse */
function parseXML(file) {
    var xmlRaw = fs.readFileSync(file).toString();
    return et.parse(xmlRaw);
}

/* Given the parsed xml tree, output it to given file */
function writeXML(tree, file) {
    var xmlString = tree.write({method:'xml', xml_declaration:true, indent:4});
    fs.writeFileSync(file, xmlString);
}

//Removes the app_name string from the provided mfp-strings.xml files.
function removeConflictXml(platformPath) {
    var stringsXML = [path.join(platformPath, 'res', 'values', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-de', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-es', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-fr', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-he', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-it', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-iw', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-ja', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-ko', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-pt-rBR', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-ru', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-zh', 'mfp-strings.xml'),
                      path.join(platformPath, 'res', 'values-zh-rTW', 'mfp-strings.xml')];
    // Iterate over the files and remove app_name, launcher_name, and activity_name strings.
    for (var i = 0; i < stringsXML.length; i++) {
        // Get src xml.
        var srcTree = parseXML(stringsXML[i]);
        // These are the string values that will be removed if they exist.
        var names = ['app_name', 'launcher_name', 'activity_name'];
        // Remove the string elements with names from the array if they exist.
        for (var j = 0; j < names.length; j++) {
            var elem = srcTree.find('.//string[@name=\'' + names[j] + '\']');
            if (elem != null) srcTree.getroot().remove(elem);
        }
        // Write xml back to files.
        writeXML(srcTree, stringsXML[i]);
    }
}
