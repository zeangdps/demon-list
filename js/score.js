/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(level, percent, minPercent, user = null) {
	const rank = level.rank
	console.log(level)
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Old formula
    /*
    let score = (100 / Math.sqrt((rank - 1) / 50 + 0.444444) - 50) *
        ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    */
    // New formula
    // let score = (-24.9975*Math.pow(rank-1, 0.4) + 200) *
    //     ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
	let score = 0
	
	if (rank === 1) {
		score = 250;
		console.log(score);
	} else if (rank >= 2 && rank <= 5) {
		score = 100;
	} else if (rank >= 6 && rank <= 10) {
		score = 50;
	} else if (rank >= 11) {
		score = 25;
	}

	if (user && (user === level.author || level.creators.some((c) => c === user)) && user === level.verifier) {
		if (rank == 1) {
			score += 100
		} else {
			score += 50
		}
	}


    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
