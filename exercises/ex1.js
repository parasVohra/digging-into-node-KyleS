#!/usr/bin/env node

"use strict";
const path = require("path");
const fs = require("fs");
const util = require("util");

const getStdin = require("get-stdin");

const args = require("minimist")(process.argv.slice(2), {
    boolean: ["help", "in"],
    string: ["file"],
});

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (process.env.HELLO) {
    console.log(process.env.HELLO);
}

if (args.help) {
    printHelp();
} else if (args.in || args._.includes("-")) {
    getStdin().then(processFile).catch(error);
} else if (args.file) {
    let filepath = path.join(BASE_PATH, args.file);
    fs.readFile(filepath, function onContent(err, contents) {
        if (err) {
            error(err.toString());
        } else {
            processFile(contents.toString());
        }
    });
} else {
    error("incorrect usage", true);
}

// ******************

function processFile(content) {
    const contents = content.toUpperCase();
    process.stdout.write(content);
}

function printHelp() {
    console.log("ex1 usage:");
    console.log(" ex1.js --help");
    console.log("");
    console.log("--help                         print this help");
    console.log("--file={FILENAME");
    console.log("");
}

function error(msg, includeHelp = false) {
    console.error(msg);
    if (includeHelp) {
        console.log("");
        printHelp();
    }
}
