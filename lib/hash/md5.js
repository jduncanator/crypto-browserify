// JavaScript MD5 Hash Implementation
// Licensed under LGPL v3
// Copyright (c) 2014 jduncanator
// Derived from: The OpenSSL Project

var BlockSize = 64
  , InternalSize = 16
  , DigestSize = 16;

function Hash() {
	this.internalBuffer = new Buffer(BlockSize);
	this.internalBuffer.fill(0);
	this.bufferedCount = 0;

	this.A = 0x67452301;
	this.B = 0xefcdab89;
	this.C = 0x98badcfe;
	this.D = 0x10325476;

	this.Nh = 0;
	this.Nl = 0;
}

function transformBlock(ctx, data, num) {
	var A = ctx.A, B = ctx.B, C = ctx.C, D = ctx.D, i = 0;

	while(num--) {
		/* Round 0 */
		A = R0(A,B,C,D,data.readInt32LE((i + 0) * 4), 7,0xd76aa478);
		D = R0(D,A,B,C,data.readInt32LE((i + 1) * 4),12,0xe8c7b756);
		C = R0(C,D,A,B,data.readInt32LE((i + 2) * 4),17,0x242070db);
		B = R0(B,C,D,A,data.readInt32LE((i + 3) * 4),22,0xc1bdceee);
		A = R0(A,B,C,D,data.readInt32LE((i + 4) * 4), 7,0xf57c0faf);
		D = R0(D,A,B,C,data.readInt32LE((i + 5) * 4),12,0x4787c62a);
		C = R0(C,D,A,B,data.readInt32LE((i + 6) * 4),17,0xa8304613);
		B = R0(B,C,D,A,data.readInt32LE((i + 7) * 4),22,0xfd469501);
		A = R0(A,B,C,D,data.readInt32LE((i + 8) * 4), 7,0x698098d8);
		D = R0(D,A,B,C,data.readInt32LE((i + 9) * 4),12,0x8b44f7af);
		C = R0(C,D,A,B,data.readInt32LE((i + 10) * 4),17,0xffff5bb1);
		B = R0(B,C,D,A,data.readInt32LE((i + 11) * 4),22,0x895cd7be);
		A = R0(A,B,C,D,data.readInt32LE((i + 12) * 4), 7,0x6b901122);
		D = R0(D,A,B,C,data.readInt32LE((i + 13) * 4),12,0xfd987193);
		C = R0(C,D,A,B,data.readInt32LE((i + 14) * 4),17,0xa679438e);
		B = R0(B,C,D,A,data.readInt32LE((i + 15) * 4),22,0x49b40821);
		/* Round 1 */
		A = R1(A,B,C,D,data.readInt32LE((i + 1) * 4), 5,0xf61e2562);
		D = R1(D,A,B,C,data.readInt32LE((i + 6) * 4), 9,0xc040b340);
		C = R1(C,D,A,B,data.readInt32LE((i + 11) * 4),14,0x265e5a51);
		B = R1(B,C,D,A,data.readInt32LE((i + 0) * 4),20,0xe9b6c7aa);
		A = R1(A,B,C,D,data.readInt32LE((i + 5) * 4), 5,0xd62f105d);
		D = R1(D,A,B,C,data.readInt32LE((i + 10) * 4), 9,0x02441453);
		C = R1(C,D,A,B,data.readInt32LE((i + 15) * 4),14,0xd8a1e681);
		B = R1(B,C,D,A,data.readInt32LE((i + 4) * 4),20,0xe7d3fbc8);
		A = R1(A,B,C,D,data.readInt32LE((i + 9) * 4), 5,0x21e1cde6);
		D = R1(D,A,B,C,data.readInt32LE((i + 14) * 4), 9,0xc33707d6);
		C = R1(C,D,A,B,data.readInt32LE((i + 3) * 4),14,0xf4d50d87);
		B = R1(B,C,D,A,data.readInt32LE((i + 8) * 4),20,0x455a14ed);
		A = R1(A,B,C,D,data.readInt32LE((i + 13) * 4), 5,0xa9e3e905);
		D = R1(D,A,B,C,data.readInt32LE((i + 2) * 4), 9,0xfcefa3f8);
		C = R1(C,D,A,B,data.readInt32LE((i + 7) * 4),14,0x676f02d9);
		B = R1(B,C,D,A,data.readInt32LE((i + 12) * 4),20,0x8d2a4c8a);
		/* Round 2 */
		A = R2(A,B,C,D,data.readInt32LE((i + 5) * 4), 4,0xfffa3942);
		D = R2(D,A,B,C,data.readInt32LE((i + 8) * 4),11,0x8771f681);
		C = R2(C,D,A,B,data.readInt32LE((i + 11) * 4),16,0x6d9d6122);
		B = R2(B,C,D,A,data.readInt32LE((i + 14) * 4),23,0xfde5380c);
		A = R2(A,B,C,D,data.readInt32LE((i + 1) * 4), 4,0xa4beea44);
		D = R2(D,A,B,C,data.readInt32LE((i + 4) * 4),11,0x4bdecfa9);
		C = R2(C,D,A,B,data.readInt32LE((i + 7) * 4),16,0xf6bb4b60);
		B = R2(B,C,D,A,data.readInt32LE((i + 10) * 4),23,0xbebfbc70);
		A = R2(A,B,C,D,data.readInt32LE((i + 13) * 4), 4,0x289b7ec6);
		D = R2(D,A,B,C,data.readInt32LE((i + 0) * 4),11,0xeaa127fa);
		C = R2(C,D,A,B,data.readInt32LE((i + 3) * 4),16,0xd4ef3085);
		B = R2(B,C,D,A,data.readInt32LE((i + 6) * 4),23,0x04881d05);
		A = R2(A,B,C,D,data.readInt32LE((i + 9) * 4), 4,0xd9d4d039);
		D = R2(D,A,B,C,data.readInt32LE((i + 12) * 4),11,0xe6db99e5);
		C = R2(C,D,A,B,data.readInt32LE((i + 15) * 4),16,0x1fa27cf8);
		B = R2(B,C,D,A,data.readInt32LE((i + 2) * 4),23,0xc4ac5665);
		/* Round 3 */
		A = R3(A,B,C,D,data.readInt32LE((i + 0) * 4), 6,0xf4292244);
		D = R3(D,A,B,C,data.readInt32LE((i + 7) * 4),10,0x432aff97);
		C = R3(C,D,A,B,data.readInt32LE((i + 14) * 4),15,0xab9423a7);
		B = R3(B,C,D,A,data.readInt32LE((i + 5) * 4),21,0xfc93a039);
		A = R3(A,B,C,D,data.readInt32LE((i + 12) * 4), 6,0x655b59c3);
		D = R3(D,A,B,C,data.readInt32LE((i + 3) * 4),10,0x8f0ccc92);
		C = R3(C,D,A,B,data.readInt32LE((i + 10) * 4),15,0xffeff47d);
		B = R3(B,C,D,A,data.readInt32LE((i + 1) * 4),21,0x85845dd1);
		A = R3(A,B,C,D,data.readInt32LE((i + 8) * 4), 6,0x6fa87e4f);
		D = R3(D,A,B,C,data.readInt32LE((i + 15) * 4),10,0xfe2ce6e0);
		C = R3(C,D,A,B,data.readInt32LE((i + 6) * 4),15,0xa3014314);
		B = R3(B,C,D,A,data.readInt32LE((i + 13) * 4),21,0x4e0811a1);
		A = R3(A,B,C,D,data.readInt32LE((i + 4) * 4), 6,0xf7537e82);
		D = R3(D,A,B,C,data.readInt32LE((i + 11) * 4),10,0xbd3af235);
		C = R3(C,D,A,B,data.readInt32LE((i + 2) * 4),15,0x2ad7d2bb);
		B = R3(B,C,D,A,data.readInt32LE((i + 9) * 4),21,0xeb86d391);

		A = ctx.A = SAFEADD(ctx.A, A);
		B = ctx.B = SAFEADD(ctx.B, B);
		C = ctx.C = SAFEADD(ctx.C, C);
		D = ctx.D = SAFEADD(ctx.D, D);
		i += InternalSize;
	}
}

function F(b,c,d) { 
	return ((c ^ d) & b) ^ d;
}

function G(b,c,d) {
	return ((b ^ c) & d) ^ c;
}

function H(b,c,d) { 
	return b ^ c ^ d;
}

function I(b,c,d) {
	return ((~d) | b) ^ c;
}

function R0(a,b,c,d,k,s,t) {
	a = ROTATE(
			SAFEADD(a, 
				SAFEADD(
					SAFEADD(k, t),
					F(b, c, d)
				)
			), 
		s);
	return SAFEADD(a, b); 
}

function R1(a,b,c,d,k,s,t) {
	a = ROTATE(
			SAFEADD(a, 
				SAFEADD(
					SAFEADD(k, t),
					G(b, c, d)
				)
			), 
		s);
	return SAFEADD(a, b);
}

function R2(a,b,c,d,k,s,t) {
	a = ROTATE(
			SAFEADD(a, 
				SAFEADD(
					SAFEADD(k, t),
					H(b, c, d)
				)
			), 
		s);
	return SAFEADD(a, b);
}

function R3(a,b,c,d,k,s,t) {
	a = ROTATE(
			SAFEADD(a, 
				SAFEADD(
					SAFEADD(k, t),
					I(b, c, d)
				)
			), 
		s);
	return SAFEADD(a, b);
}

function ROTATE(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}

function SAFEADD(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

Hash.prototype.update = function(data, encoding) {
	data = new Buffer(data, encoding);

	if(!data)
		throw new Error('Oops');

	if(data.length == 0)
		return;

	var l = (this.Nl + (data.length << 3)) & 0xffffffff;
	if (l < this.Nl) /* overflow */
		this.Nh++;
	this.Nh += (data.length >> 29);
	this.Nl = l;

	var bufferedBytes = this.bufferedCount;
	// Have we got bytes buffered internally?
	if(bufferedBytes != 0)
	{
		// If the input is larger than our internal buffer and we already
		// have data in the buffer, concat it and hash it
		if(data.length >= BlockSize || data.length + bufferedBytes >= BlockSize)
		{
			// Copy 'BlockSize' input data to the internal buffer
			data.copy(this.internalBuffer, bufferedBytes, 0, BlockSize - bufferedBytes);
			// Hash one block (64 bytes)
			transformBlock(this, this.internalBuffer, 1);
			// Get remaining input data
			data = data.slice(BlockSize - bufferedBytes);
			// Reset buffer count (we just hashed it)
			this.bufferedCount = 0;
			// Erase internal buffer (Security?)
			this.internalBuffer.fill(0);
		}
		else
		{
			// If we don't have a full block, buffer it up inside
			data.copy(this.internalBuffer, bufferedBytes);
			this.bufferedCount += data.length;
			return this;
		}
	}

	// Do we have enough data to hash? (64 bytes or more)
	// Following truncates the decimal point (who wants decimals anyway?)
	var blockCount = data.length / BlockSize | 0; 
	if(blockCount > 0)
	{
		// Hash 'blockCount' blocks
		transformBlock(this, data, blockCount);
		// Get remaining input data
		data = data.slice(blockCount * BlockSize);
	}

	// If there is any left over input data, buffer it
	if(data.length != 0)
	{
		// Buffer the left overs
		this.bufferedCount = data.length;
		data.copy(this.internalBuffer);
	}

	return this;
}

Hash.prototype.digest = function(encoding) {
	var bufferedBytes = this.bufferedCount;

	// There is always room for one
	this.internalBuffer[bufferedBytes] = 0x80;
	bufferedBytes++;

	if(bufferedBytes > (BlockSize - 8))
	{
		// Pad internal buffer to one block
		this.internalBuffer.fill(0, bufferedBytes, BlockSize - bufferedBytes);
		// Reset buffer count
		bufferedBytes = 0;
		// Hash one block
		transformBlock(this, this.internalBuffer, 1);
	}

	this.internalBuffer.fill(0, bufferedBytes, BlockSize - 8 - bufferedBytes);
	this.internalBuffer.writeInt32LE(this.Nl, BlockSize - 8);
	this.internalBuffer.writeInt32LE(this.Nh, BlockSize - 4);

	// Hash one block
	transformBlock(this, this.internalBuffer, 1);

	// Clear buffer
	this.bufferedCount = 0;
	this.internalBuffer.fill(0);

	var ret = new Buffer(16);
	ret.writeInt32LE(this.A, 0);
	ret.writeInt32LE(this.B, 4);
	ret.writeInt32LE(this.C, 8);
	ret.writeInt32LE(this.D, 12);
	return ret.toString(encoding);
}

module.exports = Hash;