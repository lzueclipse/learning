# mach: bfin

.include "testutils.inc"
	start

	R1 = 0;
	R0 = 0;
	R0 = R1 ^ R0;

//_DBG ASTAT;
//R7 = ASTAT;
//DBGA ( R7.L , 1 );
	cc = az;
	r7 = cc;
	dbga( r7.l, 1);
	cc = an;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av0;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av0s;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1s;
	r7 = cc;
	dbga( r7.l, 0);

	R0 = R1 | R0;
//_DBG ASTAT;
//R7 = ASTAT;
//DBGA ( R7.L , 1 );
	cc = az;
	r7 = cc;
	dbga( r7.l, 1);
	cc = an;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av0;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av0s;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1s;
	r7 = cc;
	dbga( r7.l, 0);

	R0 = 0;
	R1 = 1;
	CC = R0 == R1;

//_DBG ASTAT;
//R7 = ASTAT;
//DBGA ( R7.L , 2 );
	cc = az;
	r7 = cc;
	dbga( r7.l, 0);
	cc = an;
	r7 = cc;
	dbga( r7.l, 1);
	cc = av0;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av0s;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1s;
	r7 = cc;
	dbga( r7.l, 0);

	CC = BITTST ( R1 , 1 );

//_DBG ASTAT;
//R7 = ASTAT;
//DBGA ( R7.L , 2 );
	cc = az;
	r7 = cc;
	dbga( r7.l, 0);
	cc = an;
	r7 = cc;
	dbga( r7.l, 1);
	cc = av0;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av0s;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1s;
	r7 = cc;
	dbga( r7.l, 0);

	CC = ! BITTST( R1 , 1 );
//_DBG ASTAT;
//R7 = ASTAT;
//DBGA ( R7.L , 0x22 );
	r7 = cc;
	dbga( r7.l, 1);
	cc = az;
	r7 = cc;
	dbga( r7.l, 0);
	cc = an;
	r7 = cc;
	dbga( r7.l, 1);
	cc = av0;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av0s;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1;
	r7 = cc;
	dbga( r7.l, 0);
	cc = av1s;
	r7 = cc;
	dbga( r7.l, 0);

	R0.L = 0;
	R0.H = 0x8000;
	R0 >>>= 1;
	_DBG ASTAT;
//R7 = ASTAT;
//DBGA ( R7.L , 0x22 );
	cc = az;
	r6 = cc;
	dbga( r6.l, 0);
	cc = an;
	r6 = cc;
	dbga( r6.l, 1);
	cc = av0;
	r6 = cc;
	dbga( r6.l, 0);
	cc = av0s;
	r6 = cc;
	dbga( r6.l, 0);
	cc = av1;
	r6 = cc;
	dbga( r6.l, 0);
	cc = av1s;
	r6 = cc;
	dbga( r6.l, 0);

	R0.L = 17767;	R0.H = 291;
	R1.L = 52719;	R1.H = -30293;
	R2.L = 39612;	R2.H = 22136;
	R3.L = 4660;	R3.H = -8464;
	R4.L = 26777;	R4.H = 9029;
	R5.L = 9029;	R5.H = 30865;
	R6.L = 21554;	R6.H = -26506;
	R7.L = 22136;	R7.H = 4660;
	R0 = R0 + R0;
	R1 = R0 - R1;
	R2 = R0 & R2;
	R3 = R0 | R3;
	R4 = R0 & R4;
	R5 = R0 & R5;
	R6 = R0 | R6;
	R7 = R0 & R7;
	DBGA ( R0.l , 35534 );	DBGA( R0.h , 582 );
	DBGA( R1.l , 48351 );	DBGA ( R1.h , 30874 );
	DBGA ( R2.l , 35468 );	DBGA ( R2.h , 576 );
	DBGA ( R3.l , 39678 );	DBGA ( R3.h , 0xdef6);
	DBGA ( R4.l , 2184 );	DBGA ( R4.h , 580 );
	DBGA ( R5.l , 580 );	DBGA( R5.h , 0 );
	DBGA ( R6.l, 57086 );	DBGA ( R6.h , 0x9a76 );
	DBGA ( R7.l , 584 );	DBGA ( R7.h , 516 );
	pass
