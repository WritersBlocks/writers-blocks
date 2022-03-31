export default `
SET UTF-8
TRY esianrtolcdugmphbyfvkwzESIANRTOLCDUGMPHBYFVKWZ'
ICONV 1
ICONV ’ '
NOSUGGEST !

# ordinal numbers
COMPOUNDMIN 1
# only in compounds: 1th, 2th, 3th
ONLYINCOMPOUND c
# compound rules:
# 1. [0-9]*1[0-9]th (10th, 11th, 12th, 56714th, etc.)
# 2. [0-9]*[02-9](1st|2nd|3rd|[4-9]th) (21st, 22nd, 123rd, 1234th, etc.)
COMPOUNDRULE 2
COMPOUNDRULE n*1t
COMPOUNDRULE n*mp
WORDCHARS 0123456789

PFX A Y 1
PFX A   0     re         .

PFX I Y 1
PFX I   0     in         .

PFX U Y 1
PFX U   0     un         .

PFX C Y 1
PFX C   0     de          .

PFX E Y 1
PFX E   0     dis         .

PFX F Y 1
PFX F   0     con         .

PFX K Y 1
PFX K   0     pro         .

SFX V N 2
SFX V   e     ive        e
SFX V   0     ive        [^e]

SFX N Y 3
SFX N   e     ion        e
SFX N   y     ication    y
SFX N   0     en         [^ey]

SFX X Y 3
SFX X   e     ions       e
SFX X   y     ications   y
SFX X   0     ens        [^ey]

SFX H N 2
SFX H   y     ieth       y
SFX H   0     th         [^y]

SFX Y Y 1
SFX Y   0     ly         .

SFX G Y 2
SFX G   e     ing        e
SFX G   0     ing        [^e]

SFX J Y 2
SFX J   e     ings       e
SFX J   0     ings       [^e]

SFX D Y 4
SFX D   0     d          e
SFX D   y     ied        [^aeiou]y
SFX D   0     ed         [^ey]
SFX D   0     ed         [aeiou]y

SFX T N 4
SFX T   0     st         e
SFX T   y     iest       [^aeiou]y
SFX T   0     est        [aeiou]y
SFX T   0     est        [^ey]

SFX R Y 4
SFX R   0     r          e
SFX R   y     ier        [^aeiou]y
SFX R   0     er         [aeiou]y
SFX R   0     er         [^ey]

SFX Z Y 4
SFX Z   0     rs         e
SFX Z   y     iers       [^aeiou]y
SFX Z   0     ers        [aeiou]y
SFX Z   0     ers        [^ey]

SFX S Y 4
SFX S   y     ies        [^aeiou]y
SFX S   0     s          [aeiou]y
SFX S   0     es         [sxzh]
SFX S   0     s          [^sxzhy]

SFX P Y 3
SFX P   y     iness      [^aeiou]y
SFX P   0     ness       [aeiou]y
SFX P   0     ness       [^y]

SFX M Y 1
SFX M   0     's         .

SFX B Y 3
SFX B   0     able       [^aeiou]
SFX B   0     able       ee
SFX B   e     able       [^aeiou]e

SFX L Y 1
SFX L   0     ment       .

REP 90
REP a ei
REP ei a
REP a ey
REP ey a
REP ai ie
REP ie ai
REP alot a_lot
REP are air
REP are ear
REP are eir
REP air are
REP air ere
REP ere air
REP ere ear
REP ere eir
REP ear are
REP ear air
REP ear ere
REP eir are
REP eir ere
REP ch te
REP te ch
REP ch ti
REP ti ch
REP ch tu
REP tu ch
REP ch s
REP s ch
REP ch k
REP k ch
REP f ph
REP ph f
REP gh f
REP f gh
REP i igh
REP igh i
REP i uy
REP uy i
REP i ee
REP ee i
REP j di
REP di j
REP j gg
REP gg j
REP j ge
REP ge j
REP s ti
REP ti s
REP s ci
REP ci s
REP k cc
REP cc k
REP k qu
REP qu k
REP kw qu
REP o eau
REP eau o
REP o ew
REP ew o
REP oo ew
REP ew oo
REP ew ui
REP ui ew
REP oo ui
REP ui oo
REP ew u
REP u ew
REP oo u
REP u oo
REP u oe
REP oe u
REP u ieu
REP ieu u
REP ue ew
REP ew ue
REP uff ough
REP oo ieu
REP ieu oo
REP ier ear
REP ear ier
REP ear air
REP air ear
REP w qu
REP qu w
REP z ss
REP ss z
REP shun tion
REP shun sion
REP shun cion
REP size cise
`;
