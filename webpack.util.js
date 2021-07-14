// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import path from 'node:path';

function tryResolve_(url, sourceFilename) {
  // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors when the importer throws
  try {
    return require.resolve(url, { paths: [path.dirname(sourceFilename)] });
  } catch {
    return '';
  }
}

function tryResolveScss(url, sourceFilename) {
  // Support omission of .scss and leading _
  const normalizedUrl = path.extname(url) == '.scss' ? url : `${url}.scss`;
  const relativeUrl = path.join(
    path.dirname(normalizedUrl),
    `_${path.basename(normalizedUrl)}`,
  );

  return (
    tryResolve_(normalizedUrl, sourceFilename) ||
    tryResolve_(relativeUrl, sourceFilename)
  );
}

function importer(url, previous) {
  if (url.startsWith('@mcwv')) {
    const normalizedUrl = path.extname(url) == '.scss' ? url.slice(-5) : url;
    const packageName = normalizedUrl.slice(6);
    url = `../mcwv-${packageName}/index.scss`;
    const resolved = tryResolveScss(url, previous);
    return { file: resolved || url };
  }
  return { file: url };
}

export { importer };
