




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

 var words = new Array(InternalSize);

 while(num--) {

  words[0] = data.readInt32LE((i + 0) * 4);
  A+=((words[0])+(0xd76aa478)+((((C) ^ (D)) & (B)) ^ (D))); A=((A << 7) | (A >>> (32 - 7))); A+=B; words[1] = data.readInt32LE((i + 1) * 4);
  D+=((words[1])+(0xe8c7b756)+((((B) ^ (C)) & (A)) ^ (C))); D=((D << 12) | (D >>> (32 - 12))); D+=A; words[2] = data.readInt32LE((i + 2) * 4);
  C+=((words[2])+(0x242070db)+((((A) ^ (B)) & (D)) ^ (B))); C=((C << 17) | (C >>> (32 - 17))); C+=D; words[3] = data.readInt32LE((i + 3) * 4);
  B+=((words[3])+(0xc1bdceee)+((((D) ^ (A)) & (C)) ^ (A))); B=((B << 22) | (B >>> (32 - 22))); B+=C; words[4] = data.readInt32LE((i + 4) * 4);
  A+=((words[4])+(0xf57c0faf)+((((C) ^ (D)) & (B)) ^ (D))); A=((A << 7) | (A >>> (32 - 7))); A+=B; words[5] = data.readInt32LE((i + 5) * 4);
  D+=((words[5])+(0x4787c62a)+((((B) ^ (C)) & (A)) ^ (C))); D=((D << 12) | (D >>> (32 - 12))); D+=A; words[6] = data.readInt32LE((i + 6) * 4);
  C+=((words[6])+(0xa8304613)+((((A) ^ (B)) & (D)) ^ (B))); C=((C << 17) | (C >>> (32 - 17))); C+=D; words[7] = data.readInt32LE((i + 7) * 4);
  B+=((words[7])+(0xfd469501)+((((D) ^ (A)) & (C)) ^ (A))); B=((B << 22) | (B >>> (32 - 22))); B+=C; words[8] = data.readInt32LE((i + 8) * 4);
  A+=((words[8])+(0x698098d8)+((((C) ^ (D)) & (B)) ^ (D))); A=((A << 7) | (A >>> (32 - 7))); A+=B; words[9] = data.readInt32LE((i + 9) * 4);
  D+=((words[9])+(0x8b44f7af)+((((B) ^ (C)) & (A)) ^ (C))); D=((D << 12) | (D >>> (32 - 12))); D+=A; words[10] = data.readInt32LE((i + 10) * 4);
  C+=((words[10])+(0xffff5bb1)+((((A) ^ (B)) & (D)) ^ (B))); C=((C << 17) | (C >>> (32 - 17))); C+=D; words[11] = data.readInt32LE((i + 11) * 4);
  B+=((words[11])+(0x895cd7be)+((((D) ^ (A)) & (C)) ^ (A))); B=((B << 22) | (B >>> (32 - 22))); B+=C; words[12] = data.readInt32LE((i + 12) * 4);
  A+=((words[12])+(0x6b901122)+((((C) ^ (D)) & (B)) ^ (D))); A=((A << 7) | (A >>> (32 - 7))); A+=B; words[13] = data.readInt32LE((i + 13) * 4);
  D+=((words[13])+(0xfd987193)+((((B) ^ (C)) & (A)) ^ (C))); D=((D << 12) | (D >>> (32 - 12))); D+=A; words[14] = data.readInt32LE((i + 14) * 4);
  C+=((words[14])+(0xa679438e)+((((A) ^ (B)) & (D)) ^ (B))); C=((C << 17) | (C >>> (32 - 17))); C+=D; words[15] = data.readInt32LE((i + 15) * 4);
  B+=((words[15])+(0x49b40821)+((((D) ^ (A)) & (C)) ^ (A))); B=((B << 22) | (B >>> (32 - 22))); B+=C;

  A+=((words[1])+(0xf61e2562)+((((B) ^ (C)) & (D)) ^ (C))); A=((A << 5) | (A >>> (32 - 5))); A+=B;
  D+=((words[6])+(0xc040b340)+((((A) ^ (B)) & (C)) ^ (B))); D=((D << 9) | (D >>> (32 - 9))); D+=A;
  C+=((words[11])+(0x265e5a51)+((((D) ^ (A)) & (B)) ^ (A))); C=((C << 14) | (C >>> (32 - 14))); C+=D;
  B+=((words[0])+(0xe9b6c7aa)+((((C) ^ (D)) & (A)) ^ (D))); B=((B << 20) | (B >>> (32 - 20))); B+=C;
  A+=((words[5])+(0xd62f105d)+((((B) ^ (C)) & (D)) ^ (C))); A=((A << 5) | (A >>> (32 - 5))); A+=B;
  D+=((words[10])+(0x02441453)+((((A) ^ (B)) & (C)) ^ (B))); D=((D << 9) | (D >>> (32 - 9))); D+=A;
  C+=((words[15])+(0xd8a1e681)+((((D) ^ (A)) & (B)) ^ (A))); C=((C << 14) | (C >>> (32 - 14))); C+=D;
  B+=((words[4])+(0xe7d3fbc8)+((((C) ^ (D)) & (A)) ^ (D))); B=((B << 20) | (B >>> (32 - 20))); B+=C;
  A+=((words[9])+(0x21e1cde6)+((((B) ^ (C)) & (D)) ^ (C))); A=((A << 5) | (A >>> (32 - 5))); A+=B;
  D+=((words[14])+(0xc33707d6)+((((A) ^ (B)) & (C)) ^ (B))); D=((D << 9) | (D >>> (32 - 9))); D+=A;
  C+=((words[3])+(0xf4d50d87)+((((D) ^ (A)) & (B)) ^ (A))); C=((C << 14) | (C >>> (32 - 14))); C+=D;
  B+=((words[8])+(0x455a14ed)+((((C) ^ (D)) & (A)) ^ (D))); B=((B << 20) | (B >>> (32 - 20))); B+=C;
  A+=((words[13])+(0xa9e3e905)+((((B) ^ (C)) & (D)) ^ (C))); A=((A << 5) | (A >>> (32 - 5))); A+=B;
  D+=((words[2])+(0xfcefa3f8)+((((A) ^ (B)) & (C)) ^ (B))); D=((D << 9) | (D >>> (32 - 9))); D+=A;
  C+=((words[7])+(0x676f02d9)+((((D) ^ (A)) & (B)) ^ (A))); C=((C << 14) | (C >>> (32 - 14))); C+=D;
  B+=((words[12])+(0x8d2a4c8a)+((((C) ^ (D)) & (A)) ^ (D))); B=((B << 20) | (B >>> (32 - 20))); B+=C;

  A+=((words[5])+(0xfffa3942)+((B) ^ (C) ^ (D))); A=((A << 4) | (A >>> (32 - 4))); A+=B;
  D+=((words[8])+(0x8771f681)+((A) ^ (B) ^ (C))); D=((D << 11) | (D >>> (32 - 11))); D+=A;
  C+=((words[11])+(0x6d9d6122)+((D) ^ (A) ^ (B))); C=((C << 16) | (C >>> (32 - 16))); C+=D;
  B+=((words[14])+(0xfde5380c)+((C) ^ (D) ^ (A))); B=((B << 23) | (B >>> (32 - 23))); B+=C;
  A+=((words[1])+(0xa4beea44)+((B) ^ (C) ^ (D))); A=((A << 4) | (A >>> (32 - 4))); A+=B;
  D+=((words[4])+(0x4bdecfa9)+((A) ^ (B) ^ (C))); D=((D << 11) | (D >>> (32 - 11))); D+=A;
  C+=((words[7])+(0xf6bb4b60)+((D) ^ (A) ^ (B))); C=((C << 16) | (C >>> (32 - 16))); C+=D;
  B+=((words[10])+(0xbebfbc70)+((C) ^ (D) ^ (A))); B=((B << 23) | (B >>> (32 - 23))); B+=C;
  A+=((words[13])+(0x289b7ec6)+((B) ^ (C) ^ (D))); A=((A << 4) | (A >>> (32 - 4))); A+=B;
  D+=((words[0])+(0xeaa127fa)+((A) ^ (B) ^ (C))); D=((D << 11) | (D >>> (32 - 11))); D+=A;
  C+=((words[3])+(0xd4ef3085)+((D) ^ (A) ^ (B))); C=((C << 16) | (C >>> (32 - 16))); C+=D;
  B+=((words[6])+(0x04881d05)+((C) ^ (D) ^ (A))); B=((B << 23) | (B >>> (32 - 23))); B+=C;
  A+=((words[9])+(0xd9d4d039)+((B) ^ (C) ^ (D))); A=((A << 4) | (A >>> (32 - 4))); A+=B;
  D+=((words[12])+(0xe6db99e5)+((A) ^ (B) ^ (C))); D=((D << 11) | (D >>> (32 - 11))); D+=A;
  C+=((words[15])+(0x1fa27cf8)+((D) ^ (A) ^ (B))); C=((C << 16) | (C >>> (32 - 16))); C+=D;
  B+=((words[2])+(0xc4ac5665)+((C) ^ (D) ^ (A))); B=((B << 23) | (B >>> (32 - 23))); B+=C;

  A+=((words[0])+(0xf4292244)+(((~(D)) | (B)) ^ (C))); A=((A << 6) | (A >>> (32 - 6))); A+=B;
  D+=((words[7])+(0x432aff97)+(((~(C)) | (A)) ^ (B))); D=((D << 10) | (D >>> (32 - 10))); D+=A;
  C+=((words[14])+(0xab9423a7)+(((~(B)) | (D)) ^ (A))); C=((C << 15) | (C >>> (32 - 15))); C+=D;
  B+=((words[5])+(0xfc93a039)+(((~(A)) | (C)) ^ (D))); B=((B << 21) | (B >>> (32 - 21))); B+=C;
  A+=((words[12])+(0x655b59c3)+(((~(D)) | (B)) ^ (C))); A=((A << 6) | (A >>> (32 - 6))); A+=B;
  D+=((words[3])+(0x8f0ccc92)+(((~(C)) | (A)) ^ (B))); D=((D << 10) | (D >>> (32 - 10))); D+=A;
  C+=((words[10])+(0xffeff47d)+(((~(B)) | (D)) ^ (A))); C=((C << 15) | (C >>> (32 - 15))); C+=D;
  B+=((words[1])+(0x85845dd1)+(((~(A)) | (C)) ^ (D))); B=((B << 21) | (B >>> (32 - 21))); B+=C;
  A+=((words[8])+(0x6fa87e4f)+(((~(D)) | (B)) ^ (C))); A=((A << 6) | (A >>> (32 - 6))); A+=B;
  D+=((words[15])+(0xfe2ce6e0)+(((~(C)) | (A)) ^ (B))); D=((D << 10) | (D >>> (32 - 10))); D+=A;
  C+=((words[6])+(0xa3014314)+(((~(B)) | (D)) ^ (A))); C=((C << 15) | (C >>> (32 - 15))); C+=D;
  B+=((words[13])+(0x4e0811a1)+(((~(A)) | (C)) ^ (D))); B=((B << 21) | (B >>> (32 - 21))); B+=C;
  A+=((words[4])+(0xf7537e82)+(((~(D)) | (B)) ^ (C))); A=((A << 6) | (A >>> (32 - 6))); A+=B;
  D+=((words[11])+(0xbd3af235)+(((~(C)) | (A)) ^ (B))); D=((D << 10) | (D >>> (32 - 10))); D+=A;
  C+=((words[2])+(0x2ad7d2bb)+(((~(B)) | (D)) ^ (A))); C=((C << 15) | (C >>> (32 - 15))); C+=D;
  B+=((words[9])+(0xeb86d391)+(((~(A)) | (C)) ^ (D))); B=((B << 21) | (B >>> (32 - 21))); B+=C;

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
 if (l < this.Nl)
  this.Nh++;
 this.Nh += (data.length >> 29);
 this.Nl = l;

 var bufferedBytes = this.bufferedCount;

 if(bufferedBytes != 0)
 {


  if(data.length >= BlockSize || data.length + bufferedBytes >= BlockSize)
  {

   data.copy(this.internalBuffer, bufferedBytes, 0, BlockSize - bufferedBytes);

   transformBlock(this, this.internalBuffer, 1);

   data = data.slice(BlockSize - bufferedBytes);

   this.bufferedCount = 0;

   this.internalBuffer.fill(0);
  }
  else
  {

   data.copy(this.internalBuffer, bufferedBytes);
   this.bufferedCount += data.length;
   return this;
  }
 }



 var blockCount = data.length / BlockSize | 0;
 if(blockCount > 0)
 {

  transformBlock(this, data, blockCount);

  data = data.slice(blockCount * BlockSize);
 }


 if(data.length != 0)
 {

  this.bufferedCount = data.length;
  data.copy(this.internalBuffer);
 }

 return this;
}

Hash.prototype.digest = function(encoding) {
 var bufferedBytes = this.bufferedCount;


 this.internalBuffer[bufferedBytes] = 0x80;
 bufferedBytes++;

 if(bufferedBytes > (BlockSize - 8))
 {

  this.internalBuffer.fill(0, bufferedBytes, BlockSize - bufferedBytes);

  bufferedBytes = 0;

  transformBlock(this, this.internalBuffer, 1);
 }

 this.internalBuffer.fill(0, bufferedBytes, BlockSize - 8 - bufferedBytes);
 this.internalBuffer.writeInt32LE(this.Nl, BlockSize - 8);
 this.internalBuffer.writeInt32LE(this.Nh, BlockSize - 4);


 transformBlock(this, this.internalBuffer, 1);


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
