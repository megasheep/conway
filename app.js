const canvas = document.createElement( 'canvas' ),
	  ctx = canvas.getContext( '2d' );
	  canvas.width = 600;
	  canvas.height = 600;
	  document.body.appendChild( canvas );

let cells = [];

( function init() {

	ctx.scale( 6, 6 );
	ctx.fillStyle = 'white';
	ctx.fillRect( 0, 0, 100, 100 );

	for ( let i = 0; i < 100; i++ ) {
		cells[i] = [];
		for ( let j = 0; j < 100; j++ ) {
			cells[i][j] = Math.round( Math.random()*0.6 );
			if ( cells[i][j] ) {
				ctx.fillStyle = 'black';
				ctx.fillRect( i, j, 1, 1 );
			}
		}
	}

	run();
} )();

function run() {

	const cells_copy = JSON.parse( JSON.stringify( cells ) );

	for ( let i = 0; i < 100; i++ ) {
		for ( let j = 0; j < 100; j++ ) {

			let neighbors = 0;
			neighbors += cells_copy[i==99?0:i+1][j];
			neighbors += cells_copy[i==0?99:i-1][j];
			neighbors += cells_copy[i][j==99?0:j+1];
			neighbors += cells_copy[i][j==0?99:j-1];
			neighbors += cells_copy[i==99?0:i+1][j==99?0:j+1];
			neighbors += cells_copy[i==0?99:i-1][j==0?99:j-1];
			neighbors += cells_copy[i==99?0:i+1][j==0?99:j-1];
			neighbors += cells_copy[i==0?99:i-1][j==99?0:j+1];

			if ( cells_copy[i][j] ) {
				if ( neighbors < 2 || neighbors > 3 ) { cells[i][j] = false; }
				else if ( neighbors == 2 || neighbors == 3 ) { cells[i][j] = true; }
			} else {
				if ( neighbors == 3 ) { cells[i][j] = true; }
			}

			ctx.fillStyle = cells[i][j] ? 'black' : 'white';
			ctx.fillRect( i, j, 1, 1 );

		}
	}

	setTimeout( run, 30 );
}