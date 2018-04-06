let inputBox;
let errorDiv;
let resultDiv;

function setup() {
	inputBox = select("#input");

	errorDiv = select("#error");
	
	MathJax.Hub.queue.Push(() => {
		resultDiv = MathJax.Hub.getAllJax("result")[0];
	});
	
	inputBox.input(() => {
		try {
			let l = "\\sqrt{" + inputBox.value() + "}=";

			let val = parseInt(inputBox.value());
			let neg = val < 0;
			val = abs(val);
			let coeff = 1;

			if(val !== 0) {
				const sqrtVal = sqrt(val) + 1;
				while(val % 4 === 0) {
					val /= 4;
					coeff *= 2;
				}
				for(let i = 3, g = 2; i < sqrtVal; i += 2) {
					const sq = i * i;
					while(val % sq === 0) {
						val /= sq;
						coeff *= i;
					}
				}
			}
			
			if(coeff !== 1 || (val === 1 && !neg)) l += coeff.toString();
			if(val === 0) l += "0";
			else if(val !== 1) l += " \\sqrt{" + val.toString() + "}";
			if(neg) l += "i";

			MathJax.Hub.queue.Push(["Text", resultDiv, l]);
		}
		catch(e) {
			errorDiv.html(e);
		}
	});
}

