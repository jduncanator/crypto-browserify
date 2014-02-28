# crypto-browserify

A (partial) port of `crypto` to the browser.


[![travis](https://secure.travis-ci.org/jduncanator/crypto-browserify.png?branch=master)](https://travis-ci.org/jduncanator/crypto-browserify) [![Build Status](https://drone.io/github.com/jduncanator/crypto-browserify/status.png)](https://drone.io/github.com/jduncanator/crypto-browserify/latest) [![Coverage Status](https://coveralls.io/repos/jduncanator/crypto-browserify/badge.png)](https://coveralls.io/r/jduncanator/crypto-browserify) [![Node.ci](https://node.ci/report/jduncanator/crypto-browserify/master.png)]
(https://node.ci/projects/jduncanator/crypto-browserify/master)

[![browser support](https://ci.testling.com/jduncanator/crypto-browserify.png)](http://ci.testling.com/jduncanator/crypto-browserify)


Basically, I found some crypto implemented in JS lieing on the internet somewhere
and wrapped it in the part of the `crypto` api that I am currently using.

In a way that will be compatible with [browserify](https://github.com/substack/node-browserify/).

I will extend this if I need more features, or if anyone else wants to extend this,
I will add you as a maintainer.

Provided that you agree that it should replicate the [node.js/crypto](http://nodejs.org/api/crypto.html) api exactly, of course.

## TODO

### Hash Algorithms

  * ~~md4~~
  * ~~md5~~
  * mdc2
  * ripemd
  * ripemd160
  * rmd160
  * sha
  * ~~sha1~~
  * ~~sha224~~
  * ~~sha256~~
  * sha384
  * sha512
  * whirlpool

### Cipher Algorithms (Supported as of 1.0.1e)

  * AES
    * AES-128-CBC
    * AES-128-CFB
    * AES-128-CFB1
    * AES-128-CFB8
    * AES-128-CTR
    * AES-128-ECB
    * AES-128-OFB
    * AES-128-XTS
    * AES-192-CBC
    * AES-192-CFB
    * AES-192-CFB1
    * AES-192-CFB8
    * AES-192-CTR
    * AES-192-ECB
    * AES-192-OFB
    * AES-256-CBC
    * AES-256-CFB
    * AES-256-CFB1
    * AES-256-CFB8
    * AES-256-CTR
    * AES-256-ECB
    * AES-256-OFB
    * AES-256-XTS
  * Blowfish
    * BF-CBC
    * BF-CFB
    * BF-ECB
    * BF-OFB
  * Camellia
    * CAMELLIA-128-CBC
    * CAMELLIA-128-CFB
    * CAMELLIA-128-CFB1
    * CAMELLIA-128-CFB8
    * CAMELLIA-128-ECB
    * CAMELLIA-128-OFB
    * CAMELLIA-192-CBC
    * CAMELLIA-192-CFB
    * CAMELLIA-192-CFB1
    * CAMELLIA-192-CFB8
    * CAMELLIA-192-ECB
    * CAMELLIA-192-OFB
    * CAMELLIA-256-CBC
    * CAMELLIA-256-CFB
    * CAMELLIA-256-CFB1
    * CAMELLIA-256-CFB8
    * CAMELLIA-256-ECB
    * CAMELLIA-256-OFB
  * Cast
    * CAST5-CBC
    * CAST5-CFB
    * CAST5-ECB
    * CAST5-OFB
  * DES
    * DES-CBC
    * DES-CFB
    * DES-CFB1
    * DES-CFB8
    * DES-ECB
    * DES-OFB
  * TripleDES
    * DES-EDE
    * DES-EDE-CBC
    * DES-EDE-CFB
    * DES-EDE-OFB
    * DES-EDE3
    * DES-EDE3-CBC
    * DES-EDE3-CFB
    * DES-EDE3-CFB1
    * DES-EDE3-CFB8
    * DES-EDE3-OFB
  * DESX
    * DESX-CBC
  * Idea
    * IDEA-CBC
    * IDEA-CFB
    * IDEA-ECB
    * IDEA-OFB
  * RC2
    * RC2-40-CBC
    * RC2-64-CBC
    * RC2-CBC
    * RC2-CFB
    * RC2-ECB
    * RC2-OFB
  * RC4
    * RC4-40
    * RC4-HMAC-MD5
  * SEED
    * SEED-CBC
    * SEED-CFB
    * SEED-ECB
    * SEED-OFB
