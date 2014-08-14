/*
	Vector math benchmarks about b2Vec2_G and b2Vec2_O
	b2Vec2_G : the b2Vec2 modified into SIMD.js
	b2Vec2   : the original b2Vec2 in Box2dWeb.js
*/
(function() {
  	// common variables	
	var b = new b2Vec2(1.0, 2.0);
	var bg = new b2Vec2_G(1.0, 2.0);
	var i = 0, j = 0, tmp = 1;

	// loop size, to make the time cost in second level,
	// I would like to use a two-lever of loops to enlarge the time cost.
	var test_time1 = 100, test_time2 = 10000000;

	// time statistic
	var start = new Date(), end = new Date();


	// Benchmarks
	// Add test
	// Non-SIMD, about 3700ms
	tmp = new b2Vec2(1.0, 1.0);
	start = new Date();
	for(i = 0; i < test_time1; ++i) {
		for(j = 0; j < test_time2; ++j) {
			b.Add(tmp);
		}
	}
	end = new Date();
	console.log("Non-SIMD Add time : " + (end - start) + ",   b = { " + b.x + ", " + b.y + " }");

	// SIMD, about 9300ms
	tmp = new b2Vec2_G(1.0, 1.0);
	start = new Date();
	for(i = 0; i < test_time1; ++i) {
		for(j = 0; j < test_time2; ++j) {
			bg.Add(tmp);
		}
	}
	end = new Date();
	console.log("SIMD Add time : " + (end - start) + ",   bg = { " + bg.x + ", " + bg.y + " }");


	// Multiply test
	// Non-SIMD, about 4100ms
	tmp = 1.1;
	start = new Date();
	for(i = 0; i < test_time1; ++i) {
		for(j = 0; j < test_time2; ++j) {
			b.Multiply(tmp);
			if(j == test_time2 - 1) {
				b = new b2Vec2(1.0, 2.0);
			}
		}
	}
	end = new Date();
	console.log("Non-SIMD Multiply time : " + (end - start) + ",   b = { " + b.x + ", " + b.y + " }");

	// SIMD, about 9700ms
	tmp = 1.1;
	start = new Date();
	for(i = 0; i < test_time1; ++i) {
		for(j = 0; j < test_time2; ++j) {
			bg.Multiply(tmp);
			if(j == test_time2 - 1) {
				bg = new b2Vec2_G(1.0, 2.0);
			}
		}
	}
	end = new Date();
	console.log("SIMD Multiply time : " + (end - start) + ",   bg = { " + bg.x + ", " + bg.y + " }");

	

})();