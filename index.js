"use strict";
var PluginError = require("plugin-error");
var through = require("through2");
var css = require("css");

module.exports = function() {
  return through.obj(function(file, _, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit(
        "error",
        new PluginError("gulp-group-media-queries", "Streaming not supported")
      );
      return cb();
    }

    try {
      let tree = css.parse(file.contents.toString());

      let mediaRules = tree.stylesheet.rules.filter(
        rule => rule.type === "media"
      );

      let otherCssRules = tree.stylesheet.rules.filter(
        rule => rule.type !== "media"
      );

      let unCombinedMediaRules = {};
      mediaRules.forEach(rule => {
        if (unCombinedMediaRules[rule.media]) {
          unCombinedMediaRules[rule.media].push(rule);
        } else {
          unCombinedMediaRules[rule.media] = [rule];
        }
      });

      let combinedMediaRules = [];
      Object.entries(unCombinedMediaRules).forEach(
        ([mediaRule, ruleContent]) => {
          let rules = [];
          ruleContent.forEach(a => a.rules.forEach(rule => rules.push(rule)));
          combinedMediaRules.push({
            type: "media",
            media: mediaRule,
            rules
          });
        }
      );

      tree.stylesheet.rules = otherCssRules.concat(combinedMediaRules);
      file.contents = Buffer.from(css.stringify(tree));
    } catch (err) {
      this.emit("error", new PluginError("gulp-group-media-queries", err));
    }

    this.push(file);
    cb();
  });
};
