#!/usr/bin/env node
/*
 * Code contributed to the webinos project.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * (C) Copyright 2012, TNO
 */

var ID3 = require('id3');
var fs = require('fs');
var path = require('path');

var argv = require('optimist').argv;

var argv = require('optimist')
    .usage('Usage: indexer.js --in=<folder containing the media items> [--out=<javascript containing the indexed media library>')
    .demand(['in', 'out'])
    .argv;
    
var filenames = fs.readdirSync(argv.in);

var items = new Array;

for (var i in filenames) {
    var file = fs.readFileSync(path.join(argv.in, filenames[i]));
    
    var id3 = new ID3(file);
    id3.parse();
    
    var item = {
        filename: filenames[i],
        artist: id3.get('artist'),
        title: id3.get('title'),
        album: id3.get('album'),
        cover: id3.get('picture') ? id3.get('picture').data.toString('base64') : undefined
    }

    items.push(item);
}

fs.writeFileSync(argv.out, JSON.stringify(items));

