//selector
const output = document.querySelector(".output");
const result = document.querySelector(".result");
const keys = document.querySelectorAll("button");

//eventlistener
keys.forEach(key => {
	key.addEventListener("click", calculate);
});

addEventListener("keydown", logKey);
function logKey(e) {
	let source_array = [e.keyCode];
	output.textContent += String.fromCharCode.apply(null, source_array);
}

function toDec(str) {
	return "343.43.43";
}

function toHex(str) {
	return "ff.dd.cc";
}

function calculate() {
	let buttonText = this.innerText;

	if (buttonText === "AC") {
		output.innerText = "";
		result.innerText = "0";
		result.style.animation = "";
		output.style.animation = "";
		return;
	}

	if (buttonText === "DEC") {
		result.innerText = toDec(output.textContent);
		return;
	}

	if (buttonText === "HEX") {
		result.innerText = toHex(output.textContent);
		return;
	}

	if (buttonText === "+/-") {
		if (output.textContent.substring(0, 1) === '-') {
			output.textContent = output.textContent.substring(1, output.textContent.length);
		} else {
			output.textContent = `-` + output.textContent;
		}
		return;
	}

	if (buttonText === "DEL") {
		output.textContent = output.textContent.substring(0, output.textContent.length - 1);
		return;
	}

	if (buttonText === "=") {
		result.style.color = `white`;
		try {
			result.innerText = eval(output.innerText);
		} catch {
			result.innerText = 'ERROR!';
			result.style.color = `red`;
		}
		result.style.animation = "big 0.5s ease-in-out";
		output.style.animation = "small 0.5s ease-in-out";
		result.style.animationFillMode = "forwards";
		output.style.animationFillMode = "forwards";
	}

	else {
		output.textContent += buttonText;
	}


}

