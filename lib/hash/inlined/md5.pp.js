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

#define ROTATE(num, cnt) ((num << cnt) | (num >>> (32 - cnt)))

#define F(b,c,d) (((c ^ d) & b) ^ d)
#define G(b,c,d) (((b ^ c) & d) ^ c)
#define H(b,c,d) (b ^ c ^ d)
#define I(b,c,d) (((~d) | b) ^ c)

#define R0(a,b,c,d,k,s,t) \
	a+=((k)+(t)+F((b),(c),(d))); \
	a=ROTATE(a,s); \
	a+=b

#define R1(a,b,c,d,k,s,t) \
	a+=((k)+(t)+G((b),(c),(d))); \
	a=ROTATE(a,s); \
	a+=b

#define R2(a,b,c,d,k,s,t) \
	a+=((k)+(t)+H((b),(c),(d))); \
	a=ROTATE(a,s); \
	a+=b

#define R3(a,b,c,d,k,s,t) \
	a+=((k)+(t)+I((b),(c),(d))); \
	a=ROTATE(a,s); \
	a+=b

#define X(i) words[i]

function transformBlock(ctx, data, num) {
	var A = ctx.A, B = ctx.B, C = ctx.C, D = ctx.D, i = 0;

	//Believe it or not, but Array is WAY faster than Typed Array
	var words = new Array(InternalSize);

	while(num--) {
		/* Round 0 */
		X(0) = data.readInt32LE((i + 0) * 4);
		R0(A,B,C,D,X(0), 7,0xd76aa478); X(1) = data.readInt32LE((i + 1) * 4);
		R0(D,A,B,C,X(1),12,0xe8c7b756); X(2) = data.readInt32LE((i + 2) * 4);
		R0(C,D,A,B,X(2),17,0x242070db); X(3) = data.readInt32LE((i + 3) * 4);
		R0(B,C,D,A,X(3),22,0xc1bdceee); X(4) = data.readInt32LE((i + 4) * 4);
		R0(A,B,C,D,X(4), 7,0xf57c0faf); X(5) = data.readInt32LE((i + 5) * 4);
		R0(D,A,B,C,X(5),12,0x4787c62a); X(6) = data.readInt32LE((i + 6) * 4);
		R0(C,D,A,B,X(6),17,0xa8304613); X(7) = data.readInt32LE((i + 7) * 4);
		R0(B,C,D,A,X(7),22,0xfd469501); X(8) = data.readInt32LE((i + 8) * 4);
		R0(A,B,C,D,X(8), 7,0x698098d8); X(9) = data.readInt32LE((i + 9) * 4);
		R0(D,A,B,C,X(9),12,0x8b44f7af); X(10) = data.readInt32LE((i + 10) * 4);
		R0(C,D,A,B,X(10),17,0xffff5bb1); X(11) = data.readInt32LE((i + 11) * 4);
		R0(B,C,D,A,X(11),22,0x895cd7be); X(12) = data.readInt32LE((i + 12) * 4);
		R0(A,B,C,D,X(12), 7,0x6b901122); X(13) = data.readInt32LE((i + 13) * 4);
		R0(D,A,B,C,X(13),12,0xfd987193); X(14) = data.readInt32LE((i + 14) * 4);
		R0(C,D,A,B,X(14),17,0xa679438e); X(15) = data.readInt32LE((i + 15) * 4);
		R0(B,C,D,A,X(15),22,0x49b40821); 
		/* Round 1 */
		R1(A,B,C,D,X(1), 5,0xf61e2562);
		R1(D,A,B,C,X(6), 9,0xc040b340);
		R1(C,D,A,B,X(11),14,0x265e5a51);
		R1(B,C,D,A,X(0),20,0xe9b6c7aa);
		R1(A,B,C,D,X(5), 5,0xd62f105d);
		R1(D,A,B,C,X(10), 9,0x02441453);
		R1(C,D,A,B,X(15),14,0xd8a1e681);
		R1(B,C,D,A,X(4),20,0xe7d3fbc8);
		R1(A,B,C,D,X(9), 5,0x21e1cde6);
		R1(D,A,B,C,X(14), 9,0xc33707d6);
		R1(C,D,A,B,X(3),14,0xf4d50d87);
		R1(B,C,D,A,X(8),20,0x455a14ed);
		R1(A,B,C,D,X(13), 5,0xa9e3e905);
		R1(D,A,B,C,X(2), 9,0xfcefa3f8);
		R1(C,D,A,B,X(7),14,0x676f02d9);
		R1(B,C,D,A,X(12),20,0x8d2a4c8a);
		/* Round 2 */
		R2(A,B,C,D,X(5), 4,0xfffa3942);
		R2(D,A,B,C,X(8),11,0x8771f681);
		R2(C,D,A,B,X(11),16,0x6d9d6122);
		R2(B,C,D,A,X(14),23,0xfde5380c);
		R2(A,B,C,D,X(1), 4,0xa4beea44);
		R2(D,A,B,C,X(4),11,0x4bdecfa9);
		R2(C,D,A,B,X(7),16,0xf6bb4b60);
		R2(B,C,D,A,X(10),23,0xbebfbc70);
		R2(A,B,C,D,X(13), 4,0x289b7ec6);
		R2(D,A,B,C,X(0),11,0xeaa127fa);
		R2(C,D,A,B,X(3),16,0xd4ef3085);
		R2(B,C,D,A,X(6),23,0x04881d05);
		R2(A,B,C,D,X(9), 4,0xd9d4d039);
		R2(D,A,B,C,X(12),11,0xe6db99e5);
		R2(C,D,A,B,X(15),16,0x1fa27cf8);
		R2(B,C,D,A,X(2),23,0xc4ac5665);
		/* Round 3 */
		R3(A,B,C,D,X(0), 6,0xf4292244);
		R3(D,A,B,C,X(7),10,0x432aff97);
		R3(C,D,A,B,X(14),15,0xab9423a7);
		R3(B,C,D,A,X(5),21,0xfc93a039);
		R3(A,B,C,D,X(12), 6,0x655b59c3);
		R3(D,A,B,C,X(3),10,0x8f0ccc92);
		R3(C,D,A,B,X(10),15,0xffeff47d);
		R3(B,C,D,A,X(1),21,0x85845dd1);
		R3(A,B,C,D,X(8), 6,0x6fa87e4f);
		R3(D,A,B,C,X(15),10,0xfe2ce6e0);
		R3(C,D,A,B,X(6),15,0xa3014314);
		R3(B,C,D,A,X(13),21,0x4e0811a1);
		R3(A,B,C,D,X(4), 6,0xf7537e82);
		R3(D,A,B,C,X(11),10,0xbd3af235);
		R3(C,D,A,B,X(2),15,0x2ad7d2bb);
		R3(B,C,D,A,X(9),21,0xeb86d391);

		A = ctx.A = SAFEADD(ctx.A, A);
		B = ctx.B = SAFEADD(ctx.B, B);
		C = ctx.C = SAFEADD(ctx.C, C);
		D = ctx.D = SAFEADD(ctx.D, D);
		i += InternalSize;
	}
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