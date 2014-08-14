function b2Vec2_G() {
   b2Vec2_G.b2Vec2_G.apply(this, arguments);
   if (this.constructor === b2Vec2_G) this.b2Vec2_G.apply(this, arguments);
};
b2Vec2_G.b2Vec2_G = function () {};
b2Vec2_G.prototype.b2Vec2_G = function (x_, y_) {
   if (x_ === undefined) x_ = 0;
   if (y_ === undefined) y_ = 0;
   /*
      The reason is with this, JS engine can know the type (via typed array)
      without changing back and forth. But it still bring an extra memory 
      load operations.
   */
   this.contents = new Float64x2Array(1);
   this.contents[0] = SIMD.float64x2(x_, y_);
};
b2Vec2_G.prototype.SetZero = function () {
   this.contents[0] = SIMD.float64x2.zero();
};
b2Vec2_G.prototype.Set = function (x_, y_) {
   if (x_ === undefined) x_ = 0;
   if (y_ === undefined) y_ = 0;
   this.contents[0] = SIMD.float64x2(x_, y_);
};
b2Vec2_G.prototype.SetV = function (v) {
   this.contents[0] = SIMD.float64x2(v.contents[0].x, v.contents[0].y);
};
b2Vec2_G.prototype.GetNegative = function () {
   return new b2Vec2_G((-this.contents[0].x), (-this.contents[0].y));
};
b2Vec2_G.prototype.NegativeSelf = function () {
   this.contents[0] = SIMD.float64x2.neg(this.contents[0]);
};
b2Vec2_G.Make = function (x_, y_) {
   if (x_ === undefined) x_ = 0;
   if (y_ === undefined) y_ = 0;
   return new b2Vec2_G(x_, y_);
};
b2Vec2_G.prototype.Copy = function () {
   return new b2Vec2_G(this.contents[0].x, this.contents[0].y);
};
b2Vec2_G.prototype.Add = function (v) {
   this.contents[0] = SIMD.float64x2.add(this.contents[0], v.contents[0]);
};
b2Vec2_G.prototype.Subtract = function (v) {
   this.contents[0] = SIMD.float64x2.sub(this.contents[0], v.contents[0]);
};
b2Vec2_G.prototype.Multiply = function (a) {
   if (a === undefined) a = 0;
   this.contents[0] = SIMD.float64x2.scale(this.contents[0], a);
};
b2Vec2_G.prototype.MulM = function (A) {
   var tX = this.contents[0].x;
   var tY = this.contents[0].y;
   var scale_ACol1 = SIMD.float64x2.scale(A.col1.contents[0], tX);
   var scale_ACol2 = SIMD.float64x2.scale(A.col2.contents[0], tY);
   this.contents[0] = SIMD.float64x2.add(scale_ACol1, scale_ACol2);
};
b2Vec2_G.prototype.MulTM = function (A) {
   var Dot1 = SIMD.float64x2.mul(this.contents[0], A.col1.contents[0]);
   var Dot2 = SIMD.float64x2.mul(this.contents[0], A.col2.contents[0]);
   this.contents[0] = SIMD.float64x2(Dot1.x + Dot1.y, Dot2.x + Dot2.y);
};
b2Vec2_G.prototype.CrossVF = function (s) {
   if (s === undefined) s = 0;
   var tmp1 = SIMD.float64x2(this.contents[0].y, this.contents[0].x);
   var tmp2 = SIMD.float64x2(s, -s);
   this.contents[0] = SIMD.float64x2.mul(tmp1, tmp2);
};
b2Vec2_G.prototype.CrossFV = function (s) {
   if (s === undefined) s = 0;
   var tmp1 = SIMD.float64x2(this.contents[0].y, this.contents[0].x);
   var tmp2 = SIMD.float64x2(-s, s);
   this.contents[0] = SIMD.float64x2.mul(tmp1, tmp2);
};
b2Vec2_G.prototype.MinV = function (b) {
   this.contents[0] = SIMD.float64x2.min(this.contents[0], b.contents[0]);
};
b2Vec2_G.prototype.MaxV = function (b) {
   this.contents[0] = SIMD.float64x2.max(this.contents[0], b.contents[0]);
};
b2Vec2_G.prototype.Abs = function () {
   this.contents[0] = SIMD.float64x2.abs(this.contents[0]);
};
b2Vec2_G.prototype.Length = function () {
   var tmp = SIMD.float64x2.mul(this.contents[0], this.contents[0]);
   return Math.sqrt(tmp.x + tmp.y);
};
b2Vec2_G.prototype.LengthSquared = function () {
   var tmp = SIMD.float64x2.mul(this.contents[0], this.contents[0]);
   return (tmp.x + tmp.y);
};
b2Vec2_G.prototype.Normalize = function () {
   var tmp = SIMD.float64x2.mul(this.contents[0], this.contents[0]);
   var length = Math.sqrt(tmp.x + tmp.y);
   if(length < Number.MIN_VALUE) {
      return 0.0;
   }
   var invLength = 1.0 / length;
   this.contents[0] = SIMD.float64x2.scale(this.contents[0], invLength);
   return length;
};
b2Vec2_G.prototype.IsValid = function () {
   if(this.contents[0].x === undefined) this.contents[0].x = 0;
   if(this.contents[0].y === undefined) this.contents[0].y = 0;
   return isFinite(this.contents[0].x) && isFinite(this.contents[0].y);
};

/*
   Additional functions
*/
Object.defineProperty(b2Vec2_G.prototype, 'x', {
   get: function() { 
      return this.contents[0].x; 
   },
   set: function(new_value) {
      this.contents[0] = SIMD.float64x2.withX(this.contents[0], new_value);
   }
});
Object.defineProperty(b2Vec2_G.prototype, 'y', {
   get: function() { 
      return this.contents[0].y;
   },
   set: function(new_value) {
      this.contents[0] = SIMD.float64x2.withY(this.contents[0], new_value);
   }
});