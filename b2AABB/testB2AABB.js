/*
	Benchmarks about b2AABB_G and b2AABB_O
	b2AABB_G : the b2AABB modified into SIMD.js
	b2AABB   : the original b2AABB in Box2dWeb.js
*/
(function() {
  	var aabbg = new b2AABB_G();
  	var aabb = new b2AABB();

  	aabbg.lowerBound[0] = SIMD.float64x2(1.0, 2.0);
  	aabbg.upperBound[0] = SIMD.float64x2(2.0, 3.0);
  	aabb.lowerBound.Set(1.0, 2.0);
  	aabb.upperBound.Set(2.0, 3.0);

  	var i = 0, j = 0, result = 0, test_time1 = 1000000, test_time2 = 100;
  	var start = new Date(), end = new Date();

  	// GetCenter Test
  	// As both GetCenter return b2Vec2, so the Add function will not 
  	// influence the judge result.
  	
  	// Non-SIMD
  	result = aabb.GetCenter();
  	start = new Date();
  	for(i = 0; i < test_time1; ++i) {
  		for(j = 0; j < test_time2; ++j) {
  			// result.Add(aabb.GetCenter());
  			result = aabb.GetCenter();
  		}
  	}
  	end = new Date();
  	console.log("b2AABB GetCenter time : " + (end-start) + ",  result = { " + result.x + ", " + result.y + " }");

  	// SIMD
  	result = aabbg.GetCenter();
  	start = new Date();
  	for(i = 0; i < test_time1; ++i) {
  		for(j = 0; j < test_time2; ++j) {
  			// result.Add(aabbg.GetCenter());
  			result = aabbg.GetCenter();
  		}
  	}
  	end = new Date();
  	console.log("b2AABB_G GetCenter time : " + (end-start) + ",  result = { " + result.x + ", " + result.y + " }");

  	
  	// TestOverlap Test
  	var aabbg_2 = new b2AABB_G();
  	aabbg_2.lowerBound[0] = SIMD.float64x2(1.0, 2.0);
  	aabbg_2.upperBound[0] = SIMD.float64x2(2.0, 3.0);

  	var aabb_2 = new b2AABB();
  	aabb_2.lowerBound.Set(1.0, 2.0);
  	aabb_2.upperBound.Set(2.0, 3.0);

  	// Non-SIMD
  	result = 0;
  	start = new Date();
  	for(i = 0; i < test_time1; ++i) {
  		for(j = 0; j < test_time2; ++j) {
  			result = result + aabb.TestOverlap(aabb_2);
  		}
  	}
  	end = new Date();
  	console.log("b2AABB TestOverlap time : " + (end-start) + ",  result = " + result);

  	// SIMD
  	result = 0;
  	start = new Date();
  	for(i = 0; i < test_time1; ++i) {
  		for(j = 0; j < test_time2; ++j) {
  			result = result + aabbg.TestOverlap(aabbg_2);
  		}
  	}
  	end = new Date();
  	console.log("b2AABB_G TestOverlap time : " + (end-start) + ",  result = " + result);


  	// Combine Test
  	var aabbg_3 = new b2AABB_G();
  	aabbg_3.lowerBound[0] = SIMD.float64x2(2.0, 1.0);
  	aabbg_3.upperBound[0] = SIMD.float64x2(3.0, 2.0);

  	var aabb_3 = new b2AABB();
  	aabb_3.lowerBound.Set(2.0, 1.0);
  	aabb_3.upperBound.Set(3.0, 2.0);

  	// Non-SIMD
  	start = new Date();
  	for(i = 0; i < test_time1; ++i) {
  		for(j = 0; j < test_time2; ++j) {
  			aabb.Combine(aabb_2, aabb_3);
  		}
  	}
  	end = new Date();
  	console.log("b2AABB Combine time : " + (end-start));

  	// SIMD
  	start = new Date();
  	for(i = 0; i < test_time1; ++i) {
  		for(j = 0; j < test_time2; ++j) {
  			aabb.Combine(aabb_2, aabb_3);
  		}
  	}
  	end = new Date();
  	console.log("b2AABB_G Combine time : " + (end-start));

})();