function b2AABB_G() {
   b2AABB_G.b2AABB_G.apply(this, arguments);
};   
b2AABB_G.b2AABB_G = function () {
   this.lowerBound = new Float64x2Array(1);
   this.upperBound = new Float64x2Array(1);
   this.lowerBound[0] = SIMD.float64x2(0.0, 0.0);
   this.upperBound[0] = SIMD.float64x2(0.0, 0.0);
};
b2AABB_G.prototype.IsValid = function () {
   var dXY = SIMD.float64x2.sub(this.upperBound[0], this.lowerBound[0]);
   var valid = dXY.x >= 0.0 && dXY.y >= 0.0;
   valid = valid && isFinite(this.lowerBound[0].x) && isFinite(this.lowerBound[0].y) && isFinite(this.upperBound[0].x) && isFinite(this.upperBound[0].y);
   return valid;
}
b2AABB_G.prototype.GetCenter = function () {
   var sum = SIMD.float64x2.add(this.lowerBound[0], this.upperBound[0]);
   var average = SIMD.float64x2.scale(sum, 0.5);
   return new b2Vec2(average.x, average.y);
}
b2AABB_G.prototype.GetExtents = function () {
   var dis = SIMD.float64x2.sub(this.upperBound[0], this.lowerBound[0]);
   var average = SIMD.float64x2.scale(dis, 0.5);
   return new b2Vec2(average.x, average.y);
}
b2AABB_G.prototype.Contains = function (aabb) {
   var result = true;
   result = result && this.lowerBound[0].x <= aabb.lowerBound[0].x;
   result = result && this.lowerBound[0].y <= aabb.lowerBound[0].y;
   result = result && aabb.upperBound[0].x <= this.upperBound[0].x;
   result = result && aabb.upperBound[0].y <= this.upperBound[0].y;
   return result;
   // chromium M37 does not support SIMD.float64x2.lessThanOrEqual
   // var simd_result1 = SIMD.float64x2.lessThanOrEqual(this.lowerBound[0], aabb.lowerBound[0]);
   // var simd_result2 = SIMD.float64x2.lessThanOrEqual(aabb.upperBound[0], this.upperBound[0]);
   // return (simd_result1.x != 0) && (simd_result1.z != 0) && (simd_result2.x != 0) && (simd_result2.z != 0);
}
b2AABB_G.prototype.RayCast = function (output, input) {
   var tmin = (-Number.MAX_VALUE);
   var tmax = Number.MAX_VALUE;
   var pX = input.p1.x;
   var pY = input.p1.y;
   var dX = input.p2.x - input.p1.x;
   var dY = input.p2.y - input.p1.y;
   var absDX = Math.abs(dX);
   var absDY = Math.abs(dY);
   var normal = output.normal;
   var inv_d = 0;
   var t1 = 0;
   var t2 = 0;
   var t3 = 0;
   var s = 0; {
      if (absDX < Number.MIN_VALUE) {
         if (pX < this.lowerBound[0].x || this.upperBound[0].x < pX) return false;
      }
      else {
         inv_d = 1.0 / dX;
         t1 = (this.lowerBound[0].x - pX) * inv_d;
         t2 = (this.upperBound[0].x - pX) * inv_d;
         s = (-1.0);
         if (t1 > t2) {
            t3 = t1;
            t1 = t2;
            t2 = t3;
            s = 1.0;
         }
         if (t1 > tmin) {
            normal.x = s;
            normal.y = 0;
            tmin = t1;
         }
         tmax = Math.min(tmax, t2);
         if (tmin > tmax) return false;
      }
   } {
      if (absDY < Number.MIN_VALUE) {
         if (pY < this.lowerBound[0].y || this.upperBound[0].y < pY) return false;
      }
      else {
         inv_d = 1.0 / dY;
         t1 = (this.lowerBound[0].y - pY) * inv_d;
         t2 = (this.upperBound[0].y - pY) * inv_d;
         s = (-1.0);
         if (t1 > t2) {
            t3 = t1;
            t1 = t2;
            t2 = t3;
            s = 1.0;
         }
         if (t1 > tmin) {
            normal.y = s;
            normal.x = 0;
            tmin = t1;
         }
         tmax = Math.min(tmax, t2);
         if (tmin > tmax) return false;
      }
   }
   output.fraction = tmin;
   return true;
}
b2AABB_G.prototype.TestOverlap = function (other) {
   var d1XY = SIMD.float64x2.sub(other.lowerBound[0], this.upperBound[0]);
   var d2XY = SIMD.float64x2.sub(this.lowerBound[0], other.upperBound[0]);
   if(d1XY.x > 0.0 || d1XY.y > 0.0) return false;
   if(d2XY.x > 0.0 || d2XY.y > 0.0) return false;
   return true;
}
b2AABB_G.Combine = function (aabb1, aabb2) {
   var aabb = new b2AABB_G();
   aabb.Combine(aabb1, aabb2);
   return aabb;
}
b2AABB_G.prototype.Combine = function (aabb1, aabb2) {
   this.lowerBound[0] = SIMD.float64x2.min(aabb1.lowerBound[0], aabb2.lowerBound[0]);
   this.upperBound[0] = SIMD.float64x2.max(aabb1.upperBound[0], aabb2.upperBound[0]);
}