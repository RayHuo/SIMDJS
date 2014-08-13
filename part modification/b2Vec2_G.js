function b2Vec2() {
   b2Vec2.b2Vec2.apply(this, arguments);
   if (this.constructor === b2Vec2) this.b2Vec2.apply(this, arguments);
};
b2Vec2.b2Vec2 = function () {};
b2Vec2.prototype.b2Vec2 = function (x_, y_) {
   if (x_ === undefined) x_ = 0;
   if (y_ === undefined) y_ = 0;
   // this.x = x_;
   // this.y = y_;
   this.contents = SIMD.float64x2(x_, y_);
}
b2Vec2.prototype.SetZero = function () {
   // this.x = 0.0;
   // this.y = 0.0;
   this.contents = SIMD.float64x2.zero();
}
b2Vec2.prototype.Set = function (x_, y_) {
   if (x_ === undefined) x_ = 0;
   if (y_ === undefined) y_ = 0;
   // this.x = x_;
   // this.y = y_;
   this.contents = SIMD.float64x2(x_, y_);
}
b2Vec2.prototype.SetV = function (v) {
   // this.x = v.x;
   // this.y = v.y;
   this.contents = SIMD.float64x2(v.contents.x, v.contents.y);
}
b2Vec2.prototype.GetNegative = function () {
   return new b2Vec2((-this.contents.x), (-this.contents.y));
}
b2Vec2.prototype.NegativeSelf = function () {
   // this.x = (-this.x);
   // this.y = (-this.y);
   this.contents = SIMD.float64x2.neg(this.contents);
}
b2Vec2.Make = function (x_, y_) {
   if (x_ === undefined) x_ = 0;
   if (y_ === undefined) y_ = 0;
   return new b2Vec2(x_, y_);
}
b2Vec2.prototype.Copy = function () {
   return new b2Vec2(this.contents.x, this.contents.y);
}
b2Vec2.prototype.Add = function (v) {
   // this.x += v.x;
   // this.y += v.y;
   this.contents = SIMD.float64x2.add(this.contents, v.contents);
}
b2Vec2.prototype.Subtract = function (v) {
   // this.x -= v.x;
   // this.y -= v.y;
   this.contents = SIMD.float64x2.sub(this.contents, v.contents);
}
b2Vec2.prototype.Multiply = function (a) {
   if (a === undefined) a = 0;
   // this.x *= a;
   // this.y *= a;
   this.contents = SIMD.float64x2.scale(this.contents, a);
}
b2Vec2.prototype.MulM = function (A) {
   // var tX = this.x;
   // this.x = A.col1.x * tX + A.col2.x * this.y;
   // this.y = A.col1.y * tX + A.col2.y * this.y;
   var tX = this.contents.x;
   var tY = this.contents.y;
   var scale_ACol1 = SIMD.float64x2.scale(A.col1.contents, tX);
   var scale_ACol2 = SIMD.float64x2.scale(A.col2.contents, tY);
   this.contents = SIMD.float64x2.add(scale_ACol1, scale_ACol2);
}
b2Vec2.prototype.MulTM = function (A) {
   var tX = b2Math.Dot(this, A.col1);
   this.contents.y = b2Math.Dot(this, A.col2);
   this.contents.x = tX;
}
b2Vec2.prototype.CrossVF = function (s) {
   if (s === undefined) s = 0;
   // var tX = this.contents.x;
   this.contents.x = s * this.contents.y;
   this.contents.y = (-s * tX);
}
b2Vec2.prototype.CrossFV = function (s) {
   if (s === undefined) s = 0;
   // var tX = this.contents.x;
   this.contents.x = (-s * this.contents.y);
   this.contents.y = s * tX;
}
b2Vec2.prototype.MinV = function (b) {
   // this.x = this.x < b.x ? this.x : b.x;
   // this.y = this.y < b.y ? this.y : b.y;
   this.contents = SIMD.float64x2.min(this.contents, b.contents);
}
b2Vec2.prototype.MaxV = function (b) {
   // this.x = this.x > b.x ? this.x : b.x;
   // this.y = this.y > b.y ? this.y : b.y;
   this.contents = SIMD.float64x2.max(this.contents, b.contents);
}
b2Vec2.prototype.Abs = function () {
   // if (this.x < 0) this.x = (-this.x);
   // if (this.y < 0) this.y = (-this.y);
   this.contents = SIMD.float64x2.abs(this.contents);
}
b2Vec2.prototype.Length = function () {
   // return Math.sqrt(this.x * this.x + this.y * this.y);
   var tmp = SIMD.float64x2.mul(this.contents, this.contents);
   return Math.sqrt(tmp.x + tmp.y);
}
b2Vec2.prototype.LengthSquared = function () {
   // return (this.x * this.x + this.y * this.y);
   var tmp = SIMD.float64x2.mul(this.contents, this.contents);
   return (tmp.x + tmp.y);
}
b2Vec2.prototype.Normalize = function () {
   // var length = Math.sqrt(this.x * this.x + this.y * this.y);
   // if (length < Number.MIN_VALUE) {
   //    return 0.0;
   // }
   // var invLength = 1.0 / length;
   // this.x *= invLength;
   // this.y *= invLength;
   // return length;
   var tmp = SIMD.float64x2.mul(this.contents, this.contents);
   var length = Math.sqrt(tmp.x + tmp.y);
   if(length < Number.MIN_VALUE) {
      return 0.0;
   }
   var invLength = 1.0 / length;
   this.contents = SIMD.float64x2.scale(this.contents, invLength);
   return length;
}
b2Vec2.prototype.IsValid = function () {
   // return b2Math.IsValid(this.x) && b2Math.IsValid(this.y);
   if(this.contents.x === undefined) this.contents.x = 0;
   if(this.contents.y === undefined) this.contents.y = 0;
   return isFinite(this.contents.x) && isFinite(this.contents.y);
}
/*
   Additional functions
*/
Object.defineProperty(b2Vec2.prototype, 'x', {
   get: function() { 
      return this.contents.x; 
   },
   set: function(new_value) {
      this.contents = SIMD.float64x2.withX(this.contents, new_value);
   }
});
Object.defineProperty(b2Vec2.prototype, 'y', {
   get: function() { 
      return this.contents.y;
   },
   set: function(new_value) {
      this.contents = SIMD.float64x2.withY(this.contents, new_value);
   }
});