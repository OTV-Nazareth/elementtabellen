import { useState, useMemo } from "react";

// ─── A/B ALLOWED ELEMENTS (from checklist) ───────────────────────────────────
const AB = {
  ub: {
    "1.101":{dv:"A",n:"Glide kip to support on LB (or glide with ½ turn kip)",A11:1,B11:1,B12:1},
    "1.104":{dv:"A",n:"Jump to hang on HB (also reverse grip) – kip to support",A11:1,B11:1,B12:1},
    "2.101":{dv:"A",n:"Cast to hstd with legs straddled or hips bent; also with hop-grip change",A11:1,B11:1,B12:1},
    "2.201":{dv:"B",n:"Cast to hstd with legs together and hips extended; also with hop-grip change, also with ½ turn",A11:1,B11:1,B12:1},
    "2.301":{dv:"C",n:"Cast with 1/1 turn (360°) to hstd",A11:1,B11:0,B12:0},
    "2.305":{dv:"C",n:"Clear hip circle to hstd (also with hop-grip change in hstd phase, or with ½ turn to hstd)",A11:1,B11:1,B12:1},
    "2.405":{dv:"D",n:"Clear hip circle with 1/1 turn (360°) to hstd",A11:1,B11:0,B12:0},
    "2.206":{dv:"B",n:"Clear underswing on LB, release and counter movement fwd in flight to hang on HB",A11:1,B11:0,B12:0},
    "3.201":{dv:"B",n:"Giant circle bwd in regular grip, or on one arm (Liu), also with ½ turn to hstd",A11:1,B11:1,B12:1},
    "3.301":{dv:"C",n:"Giant circle bwd with 1/1 turn (360°) to hstd",A11:1,B11:0,B12:0},
    "3.206":{dv:"B",n:"Giant circle fwd in reverse, regular or mix grip (also ½ turn to hstd)",A11:1,B11:1,B12:1},
    "3.310":{dv:"C",n:"Giant circle fwd in L grip with piked or stretched body (Zaytseva), also with ½ turn to hstd",A11:1,B11:0,B12:0},
    "4.101":{dv:"A",n:"Clear straddle circle fwd to clear support",A11:1,B11:1,B12:1},
    "4.201":{dv:"B",n:"Kip on HB through clear straddle support – swing/press to hstd and ½ turn in hstd phase",A11:1,B11:0,B12:0},
    "4.401":{dv:"D",n:"Stalder fwd to hstd, also with ½ turn to hstd",A11:1,B11:1,B12:1},
    "4.104":{dv:"A",n:"Clear straddle circle bwd to clear support",A11:1,B11:1,B12:1},
    "4.304":{dv:"C",n:"Stalder bwd to hstd (also with hop-grip change or ½ turn to hstd)",A11:1,B11:1,B12:1},
    "4.404":{dv:"D",n:"Stalder bwd with 1/1 turn (360°) to hstd (Frederick)",A11:1,B11:0,B12:0},
    "4.205":{dv:"B",n:"Facing inward – Stalder bwd with release and counter movement fwd in flight to hang on HB",A11:1,B11:0,B12:0},
    "4.407":{dv:"D",n:"Clear pike circle bwd to hstd, also with ½ turn to hstd",A11:1,B11:0,B12:0},
    "5.207":{dv:"B",n:"Underswing on LB (support of feet) with counter movement fwd in flight to hang on HB",A11:1,B11:0,B12:1},
    "5.108":{dv:"A",n:"Sole circle bwd (piked or straddle)",A11:1,B11:1,B12:1},
    "5.308":{dv:"C",n:"Pike sole circle bwd to hstd (also with hop-grip change to reverse grip in hstd, also with ½ turn)",A11:1,B11:1,B12:1},
    "5.408":{dv:"D",n:"Pike sole circle bwd with 1/1 turn (360°) to hstd",A11:1,B11:0,B12:0},
    "6.101":{dv:"A",n:"From HB – underswing with ½ turn (180°) or 1/1 turn (360°) to stand",A11:0,B11:1,B12:1},
    "6.102":{dv:"A",n:"From HB – clear underswing with ½ or 1/1 turn to stand",A11:0,B11:1,B12:1},
    "6.104":{dv:"A",n:"Swing fwd to salto bwd tucked, piked or stretched (flyaway)",A11:1,B11:1,B12:1},
  },
  bb: {
    "1.101":{dv:"A",n:"Leap – arabesque on landing (leg min. horizontal)",A11:1,B11:1,B12:1},
    "1.201":{dv:"B",n:"Split leap (180°)",A11:1,B11:1,B12:1},
    "1.401":{dv:"D",n:"Leap fwd with leg change to cross split",A11:1,B11:0,B12:0},
    "1.102":{dv:"A",n:"Thief vault / Scissor leap over beam to cross sit on thigh",A11:1,B11:1,B12:1},
    "1.103":{dv:"A",n:"Flank to rear support (also ½ turn) · Jump ¾ turn in support to cross sit on thigh",A11:1,B11:1,B12:1},
    "1.204":{dv:"B",n:"Jump ½ turn to clear straddle support or through straddle over beam",A11:1,B11:1,B12:1},
    "1.304":{dv:"C",n:"Straddle pike jump bwd over beam from round-off into hip circle bwd",A11:1,B11:0,B12:0},
    "1.105":{dv:"A",n:"Jump with hand support to side split sit or straddle position",A11:1,B11:1,B12:1},
    "1.305":{dv:"C",n:"Free jump to cross split sit (take-off two feet, diagonal approach) · Change leg leap to free cross split sit (Dick)",A11:1,B11:0,B12:0},
    "1.106":{dv:"A",n:"From side stand – squat or stoop through to rear support",A11:1,B11:1,B12:1},
    "1.207":{dv:"B",n:"Jump to roll fwd at end or middle of beam to sit or tuck stand",A11:1,B11:1,B12:1},
    "1.108":{dv:"A",n:"Cartwheel with bending of both arms through chest stand to swing down",A11:1,B11:1,B12:1},
    "1.208":{dv:"B",n:"Jump ½ turn over shoulder to neck stand, ½ turn to chest stand",A11:1,B11:1,B12:1},
    "1.308":{dv:"C",n:"Jump ½ turn over shoulder to neck stand, 1/1 or 1½ turn to neck stand",A11:1,B11:0,B12:0},
    "1.309":{dv:"C",n:"From cross stand facing end of beam – head kip · jump to hstd with pike to front walkover · to handspring fwd",A11:1,B11:0,B12:0},
    "1.210":{dv:"B",n:"Jump/press/swing to hstd (2 sec.) – lower to end position touching beam (also ½ turn in hstd)",A11:1,B11:1,B12:1},
    "1.310":{dv:"C",n:"Jump/press/swing to cross or side hstd with 1/1–1½ turn – lower to end position touching beam",A11:1,B11:0,B12:0},
    "1.211":{dv:"B",n:"Jump with bent hips to clear front support above horizontal minimum at 45° (planche, 2 sec.)",A11:1,B11:1,B12:1},
    "1.311":{dv:"C",n:"Jump with stretched hips to planche (2 sec.) (Shushunova) · jump/press/swing to hstd – lower to planche (2 sec.)",A11:1,B11:0,B12:0},
    "1.411":{dv:"D",n:"Jump/press/swing to hstd – 1/1 turn in hstd – lower to planche (2 sec.)",A11:1,B11:0,B12:0},
    "1.214":{dv:"B",n:"Cartwheel on one or both arms",A11:1,B11:1,B12:1},
    "1.215":{dv:"B",n:"Handspring fwd with hand repulsion from springboard to rear support · Cartwheel grasping beam to front support (90° approach)",A11:1,B11:1,B12:1},
    "1.315":{dv:"C",n:"Free (aerial) walkover fwd to rear support (90° approach)",A11:1,B11:0,B12:0},
    "1.416":{dv:"D",n:"Salto fwd tucked to stand – approach from end of beam",A11:1,B11:0,B12:0},
    "2.101":{dv:"A",n:"Split leap fwd (leg separation 180°)",A11:1,B11:1,B12:1},
    "2.201":{dv:"B",n:"Split jump (leg separation 180°) from cross position",A11:1,B11:1,B12:1},
    "2.301":{dv:"C",n:"Split leap fwd with ½ turn (180°)",A11:1,B11:1,B12:1},
    "2.302":{dv:"C",n:"Split jump with ½ turn (180°) from cross position",A11:1,B11:1,B12:1},
    "2.402":{dv:"D",n:"Split jump with 1/1 turn (360°) from cross position",A11:1,B11:0,B12:0},
    "2.203":{dv:"B",n:"Straddle pike jump (both legs above horizontal) or side split jump from cross position",A11:1,B11:1,B12:1},
    "2.303":{dv:"C",n:"Straddle pike jump with ½ turn (180°) from cross position",A11:1,B11:1,B12:1},
    "2.403":{dv:"D",n:"Straddle pike with 1/1 turn (360°) from cross position",A11:1,B11:0,B12:0},
    "2.204":{dv:"B",n:"Fouetté hop with ½ turn to land in arabesque (free leg above horizontal)",A11:1,B11:1,B12:1},
    "2.404":{dv:"D",n:"Fouetté hop with leg change to cross split (tour jeté)",A11:1,B11:0,B12:0},
    "2.105":{dv:"A",n:"Stride leap fwd with change of legs to wolf position (hip angle at 45°)",A11:1,B11:1,B12:1},
    "2.305":{dv:"C",n:"Switch leap – leap fwd with leg change (free leg swing to 45°) to cross split",A11:1,B11:1,B12:1},
    "2.405":{dv:"D",n:"Switch leap with ½ turn (180°)",A11:1,B11:0,B12:0},
    "2.206":{dv:"B",n:"Leap with ¼ turn into straddle pike position (both legs above horizontal)",A11:1,B11:1,B12:1},
    "2.306":{dv:"C",n:"Johnson – leap fwd with leg change and ¼ turn to side split or straddle pike",A11:1,B11:1,B12:1},
    "2.107":{dv:"A",n:"Pike jump from cross position (hip <90°)",A11:1,B11:1,B12:1},
    "2.207":{dv:"B",n:"Pike jump from cross position with ½ turn (180°)",A11:1,B11:1,B12:1},
    "2.407":{dv:"D",n:"Pike jump from cross position with 1/1 turn (360°)",A11:1,B11:0,B12:0},
    "2.108":{dv:"A",n:"Sissone (leg separation 180°, take off both feet, land on one foot) · Stag jump · Split ring jump",A11:1,B11:1,B12:1},
    "2.208":{dv:"B",n:"Sissone to ring position · Stag-ring jump · Sheep jump",A11:1,B11:1,B12:1},
    "2.209":{dv:"B",n:"Hop with ½ turn free leg extended at horizontal throughout · Stretched jump/hop with 1/1 turn (360°) from cross position",A11:1,B11:1,B12:1},
    "2.110":{dv:"A",n:"Cat leap (knees above horizontal alternately) · Scissors leap forward (legs above horizontal)",A11:1,B11:1,B12:1},
    "2.210":{dv:"B",n:"Cat leap with ½ turn (180°)",A11:1,B11:1,B12:1},
    "2.310":{dv:"C",n:"Cat leap with 1/1 turn (360°)",A11:1,B11:1,B12:1},
    "2.211":{dv:"B",n:"Tuck hop or jump with ½ turn (180°) from cross position (hip & knee angle at 45°)",A11:1,B11:1,B12:1},
    "2.311":{dv:"C",n:"Tuck hop or jump with 1/1 turn (360°) from cross position",A11:1,B11:1,B12:1},
    "2.112":{dv:"A",n:"Wolf hop or jump from cross position (hip angle at 45°, knees together)",A11:1,B11:1,B12:1},
    "2.212":{dv:"B",n:"Wolf hop or jump with ½ turn (180°) from cross position",A11:1,B11:1,B12:1},
    "2.412":{dv:"D",n:"Wolf hop or jump with 1/1 turn (360°) from cross position",A11:1,B11:1,B12:1},
    "3.101":{dv:"A",n:"1/1 turn (360°) on one leg – free leg optional below horizontal",A11:1,B11:1,B12:1},
    "3.201":{dv:"B",n:"1½ turn (540°) on one leg – free leg optional below horizontal",A11:1,B11:1,B12:1},
    "3.401":{dv:"D",n:"2/1 turn (720°) on one leg – free leg optional below horizontal",A11:1,B11:0,B12:0},
    "3.302":{dv:"C",n:"1/1 turn (360°) in back attitude, thigh of free leg at horizontal throughout",A11:1,B11:1,B12:1},
    "3.402":{dv:"D",n:"1½ turn (540°) in back attitude, thigh of free leg at horizontal throughout",A11:1,B11:0,B12:0},
    "3.403":{dv:"D",n:"1/1 turn (360°) pirouette with free leg held bwd with both hands (Preziosa)",A11:1,B11:0,B12:0},
    "3.304":{dv:"C",n:"1/1 turn (360°) with heel of extended free leg fwd at horizontal throughout",A11:1,B11:1,B12:1},
    "3.404":{dv:"D",n:"1½ turn (540°) with heel of extended free leg fwd at horizontal throughout",A11:1,B11:0,B12:0},
    "3.305":{dv:"C",n:"1/1 turn (360°) with free leg held upward in 180° split position throughout",A11:1,B11:1,B12:1},
    "3.405":{dv:"D",n:"1½ turn (540°) with free leg held upward in 180° split position throughout (Galante)",A11:1,B11:0,B12:0},
    "3.206":{dv:"B",n:"½ illusion turn (180°) through standing split, with/without brief touching of beam with one hand",A11:1,B11:1,B12:1},
    "3.406":{dv:"D",n:"1/1 illusion turn (360°) through standing split, with/without brief touching of beam with one hand",A11:1,B11:0,B12:0},
    "3.207":{dv:"B",n:"1/1 turn (360°) in tuck stand on one leg – free leg straight throughout",A11:1,B11:1,B12:1},
    "3.307":{dv:"C",n:"1½ turn (540°) in tuck stand on one leg – free leg straight throughout",A11:1,B11:1,B12:1},
    "3.407":{dv:"D",n:"2/1 turn (720°) or 2½ turn (900°) in tuck stand on one leg – free leg straight throughout (Humphrey)",A11:1,B11:0,B12:0},
    "3.208":{dv:"B",n:"1/1–1½ turn (360°–540°) in prone position – alternate support of hands permitted",A11:1,B11:1,B12:1},
    "3.408":{dv:"D",n:"1¼ turn (450°) on back in kip position (Li Li)",A11:1,B11:0,B12:0},
    "4.101":{dv:"A",n:"From kneeling sit – rise with body wave through toe-balance stand",A11:1,B11:1,B12:1},
    "4.102":{dv:"A",n:"Needle scale / Stand on one leg foot of free leg held above head / Scale fwd (2 sec.)",A11:1,B11:1,B12:1},
    "4.103":{dv:"A",n:"Kick to side or cross hstd (2 sec.), lower to end position touching beam",A11:1,B11:1,B12:1},
    "4.203":{dv:"B",n:"Kick to cross hstd – roll fwd with or without hand support to sit or tuck stand",A11:1,B11:1,B12:1},
    "4.104":{dv:"A",n:"Walkover fwd with/without alternate hand support (Tinsica) · Walkover fwd/bwd (Tic-Toc)",A11:1,B11:1,B12:1},
    "4.204":{dv:"B",n:"Roll fwd without hand support to sit or tuck stand",A11:1,B11:1,B12:1},
    "4.304":{dv:"C",n:"Free shoulder roll fwd with hip extension and without hand support to sit or tuck stand",A11:1,B11:0,B12:0},
    "4.105":{dv:"A",n:"Roll bwd with hand support on top of beam – landing on one or both feet",A11:1,B11:1,B12:1},
    "4.305":{dv:"C",n:"Roll bwd to hstd – lower to end position touching beam",A11:1,B11:0,B12:0},
    "4.206":{dv:"B",n:"Roll swd, body tucked/straddle piked/stretched through neck stand (also ½ turn over shoulder)",A11:1,B11:1,B12:1},
    "4.306":{dv:"C",n:"Roll swd, body stretched without hand support",A11:1,B11:0,B12:0},
    "4.107":{dv:"A",n:"Cartwheel (also one arm) · Cartwheel with flight phase before or after hand support",A11:1,B11:1,B12:1},
    "4.108":{dv:"A",n:"Walkover fwd with/without alternate hand support",A11:1,B11:1,B12:1},
    "4.208":{dv:"B",n:"Walkover fwd with support of one arm",A11:1,B11:1,B12:1},
    "4.308":{dv:"C",n:"Kick to cross hstd with ½ turn to walkover fwd · Walkover fwd in side position to side stand",A11:1,B11:0,B12:0},
    "4.109":{dv:"A",n:"Walkover bwd with/without alternate hand support (also with swing down to cross sit)",A11:1,B11:1,B12:1},
    "4.209":{dv:"B",n:"Walkover bwd with support of one arm",A11:1,B11:1,B12:1},
    "4.309":{dv:"C",n:"Walkover bwd with ½ turn to walkover fwd · Walkover bwd in side position to side stand · with stoop through to cross split sit",A11:1,B11:0,B12:0},
    "4.210":{dv:"B",n:"From extended tuck sit – walkover bwd (Valdez) · Kick over bwd through horizontal with support on one arm (Garrison)",A11:1,B11:1,B12:1},
    "4.310":{dv:"C",n:"Valdez with 1/1 turn (360°) lower to end position touching beam",A11:1,B11:0,B12:0},
    "5.201":{dv:"B",n:"Handspring fwd with flight to land on one or both legs (also one arm support)",A11:1,B11:1,B12:1},
    "5.301":{dv:"C",n:"Handspring fwd with leg change in flight phase",A11:1,B11:0,B12:0},
    "5.401":{dv:"D",n:"Jump bwd (flic-flac take-off) with ½ twist to walkover fwd (Onodi), also to tic-toc",A11:1,B11:0,B12:0},
    "5.501":{dv:"E",n:"Jump bwd (flic-flac take-off) with ½ twist to handspring fwd land on 2 feet (Worley)",A11:1,B11:0,B12:0},
    "5.202":{dv:"B",n:"Flic-flac to land on both feet",A11:1,B11:1,B12:1},
    "5.302":{dv:"C",n:"Flic-flac with ½ twist to hstd (2 sec.) – lower to optional end position",A11:1,B11:0,B12:0},
    "5.204":{dv:"B",n:"Flic-flac with step-out, also with support on one arm",A11:1,B11:1,B12:1},
    "5.304":{dv:"C",n:"Flic-flac with ½ twist after hand support",A11:1,B11:0,B12:0},
    "5.404":{dv:"D",n:"Flic-flac with min. ¾ twist (270°) before hand support (Kochetkova)",A11:1,B11:0,B12:0},
    "5.206":{dv:"B",n:"Gainer flic-flac (also one arm support)",A11:1,B11:1,B12:1},
    "5.306":{dv:"C",n:"Gainer flic-flac with ¼ twist to hstd (2 sec.) (Kitti)",A11:1,B11:0,B12:0},
    "5.207":{dv:"B",n:"Flic-flac or Gainer flic-flac with high flight phase – swing down to cross straddle sit",A11:1,B11:1,B12:1},
    "5.208":{dv:"B",n:"Round-off",A11:1,B11:1,B12:1},
    "5.408":{dv:"D",n:"Free (aerial) cartwheel – landing on one or both feet (also with leg change)",A11:1,B11:0,B12:0},
    "5.310":{dv:"C",n:"Salto fwd tucked, take-off from one leg to stand on one or two feet (Liukin)",A11:1,B11:0,B12:0},
    "5.410":{dv:"D",n:"Salto fwd tucked to cross stand",A11:1,B11:0,B12:0},
    "5.312":{dv:"C",n:"Salto bwd tucked, piked or stretched (step out)",A11:1,B11:0,B12:0},
    "6.101":{dv:"A",n:"Free (aerial) walkover fwd with ½ twist",A11:0,B11:1,B12:1},
    "6.201":{dv:"B",n:"Free (aerial) walkover fwd with 1/1 twist · Free (aerial) cartwheel with ½ twist",A11:0,B11:1,B12:1},
    "6.102":{dv:"A",n:"Salto fwd tucked or piked, also with ½ twist",A11:0,B11:1,B12:1},
    "6.202":{dv:"B",n:"Salto fwd stretched (also ½ twist) · Salto fwd tucked with 1/1 twist",A11:0,B11:1,B12:1},
    "6.203":{dv:"B",n:"Arabian salto – jump bwd ½ twist, salto fwd tucked or piked",A11:0,B11:1,B12:1},
    "6.104":{dv:"A",n:"Salto bwd tucked, piked, or stretched (also ½ twist)",A11:1,B11:1,B12:1},
  },
  fx: {
    "1.101":{dv:"A",n:"Split leap fwd (leg separation 180°)",A11:1,B11:1,B12:1},
    "1.201":{dv:"B",n:"Split leap with ½ turn (180°)",A11:1,B11:1,B12:1},
    "1.301":{dv:"C",n:"Split leap with 1/1 turn (360°)",A11:1,B11:0,B12:0},
    "1.202":{dv:"B",n:"Tour jeté – Fouetté hop with leg change to cross split (also to ring position)",A11:1,B11:1,B12:1},
    "1.302":{dv:"C",n:"Tour jeté with additional ½ turn (Produnova) · Leap fwd through tour jeté technique with ¾ turn into straddle pike (Csillag)",A11:1,B11:0,B12:0},
    "1.103":{dv:"A",n:"Tuck jump with separation of legs to cross split (180°) during flight phase",A11:0,B11:1,B12:1},
    "1.203":{dv:"B",n:"Butterfly fwd (torso parallel to floor, legs straddled, feet above hip height) · Butterfly bwd",A11:1,B11:1,B12:1},
    "1.104":{dv:"A",n:"Leap fwd with ¼ turn into straddle pike position (both legs above horizontal) or side split",A11:1,B11:1,B12:1},
    "1.204":{dv:"B",n:"Switch leap with ¼ turn to side split or straddle pike (Johnson)",A11:1,B11:1,B12:1},
    "1.304":{dv:"C",n:"Switch leap with ½ turn in flight phase (Frolova) · Johnson with additional ½ turn",A11:1,B11:0,B12:0},
    "1.105":{dv:"A",n:"Stride leap fwd with change of legs to wolf position",A11:1,B11:1,B12:1},
    "1.205":{dv:"B",n:"Switch leap – leap fwd with leg change (free leg swing to 45°) to cross split",A11:1,B11:1,B12:1},
    "1.305":{dv:"C",n:"Switch leap to ring position (180° separation of legs)",A11:1,B11:0,B12:0},
    "1.106":{dv:"A",n:"Pike jump (hip <90°) · Sheep jump (upper back arch, head release, feet almost touching head)",A11:1,B11:1,B12:1},
    "1.107":{dv:"A",n:"Straddle pike jump (both legs above horizontal) or side split jump (leg separation 180°)",A11:1,B11:1,B12:1},
    "1.207":{dv:"B",n:"Straddle pike or side split jump with ½ turn · Split jump with ½ turn",A11:1,B11:1,B12:1},
    "1.307":{dv:"C",n:"Straddle pike or side split jump with 1/1 turn (Popa) · Split jump with 1/1 turn",A11:1,B11:0,B12:0},
    "1.108":{dv:"A",n:"Straddle pike or side split jump landing in front lying support (also ½ turn) · Hop 1/1 turn to straddle and land in front lying support",A11:1,B11:1,B12:1},
    "1.109":{dv:"A",n:"Split jump (leg separation 180°) · Stag jump · Stag jump with ½ turn · Sissone (take off two feet, land on one foot)",A11:1,B11:1,B12:1},
    "1.209":{dv:"B",n:"Sissone to ring position · Stag ring jump · Split jump to ring position to land on both feet · Split jump to ring position with ½ turn to land on both feet",A11:1,B11:1,B12:1},
    "1.309":{dv:"C",n:"Split ring leap (180° separation) · Split jump to ring position with 1/1 turn (Jurkowska-Kowalska)",A11:1,B11:0,B12:0},
    "1.110":{dv:"A",n:"Stretched hop or jump with 1/1 turn (360°)",A11:1,B11:1,B12:1},
    "1.310":{dv:"C",n:"Stretched hop or jump with 2/1 turn (720°)",A11:1,B11:0,B12:0},
    "1.111":{dv:"A",n:"Cat leap (knees above horizontal alternately) · Scissors leap forward",A11:1,B11:1,B12:1},
    "1.211":{dv:"B",n:"Cat leap with 1/1 turn (360°)",A11:1,B11:1,B12:1},
    "1.311":{dv:"C",n:"Cat leap with 2/1 turn (720°)",A11:1,B11:1,B12:1},
    "1.112":{dv:"A",n:"Fouetté hop – hop ½ turn to land in arabesque with free leg above horizontal",A11:1,B11:1,B12:1},
    "1.212":{dv:"B",n:"Hop with 1/1 turn (360°), free leg extended at horizontal throughout",A11:1,B11:1,B12:1},
    "1.113":{dv:"A",n:"Tuck hop or jump with 1/1 turn (360°)",A11:1,B11:1,B12:1},
    "1.313":{dv:"C",n:"Tuck hop or jump with 2/1 turn (720°), also landing in front lying support",A11:1,B11:1,B12:1},
    "1.114":{dv:"A",n:"Wolf hop or jump (one leg bent, other extended straight fwd above horizontal, knees together)",A11:1,B11:1,B12:1},
    "1.214":{dv:"B",n:"Wolf hop or jump with 1/1 turn (360°), also landing in front lying support (Nguyen)",A11:1,B11:1,B12:1},
    "2.101":{dv:"A",n:"1/1 turn (360°) on one leg – free leg optional below horizontal",A11:1,B11:1,B12:1},
    "2.201":{dv:"B",n:"2/1 turn (720°) on one leg – free leg optional below horizontal",A11:1,B11:1,B12:1},
    "2.301":{dv:"C",n:"3/1 turn (1080°) on one leg – free leg optional below horizontal",A11:1,B11:0,B12:0},
    "2.202":{dv:"B",n:"1/1 turn (360°) with heel of extended free leg fwd at horizontal throughout",A11:1,B11:1,B12:1},
    "2.402":{dv:"D",n:"2/1 turn (720°) with heel of extended free leg fwd at horizontal throughout",A11:1,B11:1,B12:1},
    "2.203":{dv:"B",n:"1/1 turn (360°) with free leg held upward in 180° split position throughout",A11:1,B11:1,B12:1},
    "2.403":{dv:"D",n:"2/1 turn (720°) with free leg held upward in 180° split position throughout (Memmel)",A11:1,B11:1,B12:1},
    "2.404":{dv:"D",n:"2/1 turn (720°) in back attitude (thigh of free leg at horizontal throughout) (Semenova) · 2/1 turn with free leg held bwd with both hands (Berar)",A11:1,B11:1,B12:1},
    "2.205":{dv:"B",n:"1/1 turn (360°) in scale fwd with free leg above horizontal throughout",A11:1,B11:1,B12:1},
    "2.206":{dv:"B",n:"1/1 illusion turn (360°) through standing split without touching floor with hand",A11:1,B11:1,B12:1},
    "2.207":{dv:"B",n:"1/1 turn (360°) in tuck stand on one leg – free leg straight throughout",A11:1,B11:1,B12:1},
    "2.307":{dv:"C",n:"2/1 pirouette starting free leg at horizontal, lowering to wolf position (Nguyen)",A11:1,B11:1,B12:1},
    "2.407":{dv:"D",n:"2/1 turn (720°) in tuck stand on one leg – free leg straight throughout",A11:1,B11:1,B12:1},
    "2.208":{dv:"B",n:"2/1 spin (720°) or more on back in kip position (hip-leg < closed)",A11:1,B11:1,B12:1},
    "3.101":{dv:"A",n:"Jump kick or press to hstd – return movement optional (also ½ and 1/1 turn in hstd)",A11:1,B11:1,B12:1},
    "3.201":{dv:"B",n:"Jump kick or press to hstd with 1½–2/1 turn (540°–720°) in hstd – return movement optional",A11:1,B11:1,B12:1},
    "3.103":{dv:"A",n:"Roll bwd to hstd with ½ or 1/1 turn (180°–360°) in hstd",A11:1,B11:1,B12:1},
    "3.203":{dv:"B",n:"Roll bwd to hstd with 1½–2/1 turn (540°–720°) in hstd",A11:1,B11:1,B12:1},
    "3.104":{dv:"A",n:"Walkover bwd from stand or extended tuck-sit to hstd with 1/1 turn in hstd",A11:1,B11:1,B12:1},
    "3.105":{dv:"A",n:"Handspring fwd (take-off one leg) or Flyspring fwd (take-off both legs) · Jump bwd ½ twist to handspring fwd",A11:1,B11:1,B12:1},
    "3.305":{dv:"C",n:"Handspring fwd with 1/1 twist after or before hand support (Mostepanova)",A11:1,B11:0,B12:0},
    "3.106":{dv:"A",n:"Round-off",A11:1,B11:1,B12:1},
    "3.107":{dv:"A",n:"All flic-flac and gainer flic-flac variations, also with support of one arm · Arabian with ¼ twist – aerial cartwheel – continuing ¼ twist to front lying support (Tsavdaridou)",A11:1,B11:1,B12:1},
    "3.207":{dv:"B",n:"Flic-flac with 1/1 twist before hand support",A11:1,B11:0,B12:0},
    "4.101":{dv:"A",n:"Salto fwd tucked or piked",A11:1,B11:1,B12:1},
    "4.201":{dv:"B",n:"Salto fwd tucked with ½ or 1/1 twist (180°/360°) · Salto fwd piked with ½ twist",A11:1,B11:0,B12:0},
    "4.202":{dv:"B",n:"Salto fwd stretched (also with ½ twist)",A11:1,B11:1,B12:1},
    "4.302":{dv:"C",n:"Salto fwd stretched with 1/1 or 1½ twist (360°/540°)",A11:1,B11:0,B12:0},
    "4.103":{dv:"A",n:"Free (aerial) walkover fwd",A11:1,B11:1,B12:1},
    "4.104":{dv:"A",n:"Free (aerial) cartwheel or free (aerial) round-off",A11:1,B11:1,B12:1},
    "4.105":{dv:"A",n:"From take-off fwd from one or both legs – salto swd tucked or piked",A11:1,B11:1,B12:1},
    "4.205":{dv:"B",n:"Arabian salto tucked or piked (take-off bwd with ½ twist, salto fwd) – landing optional",A11:1,B11:0,B12:0},
    "5.101":{dv:"A",n:"Salto bwd tucked, piked, or stretched",A11:1,B11:1,B12:1},
    "5.201":{dv:"B",n:"Salto bwd stretched with ½ twist · Salto bwd tucked or stretched with 1/1 twist",A11:1,B11:1,B12:1},
    "5.301":{dv:"C",n:"Salto bwd stretched with 1½ or 2/1 twist (540°/720°)",A11:1,B11:0,B12:0},
    "5.104":{dv:"A",n:"Whip salto bwd",A11:1,B11:1,B12:1},
    "5.204":{dv:"B",n:"Whip salto bwd with ½ twist (180°)",A11:1,B11:0,B12:0},
    "5.304":{dv:"C",n:"Whip salto bwd with 1/1 twist (360°)",A11:1,B11:0,B12:0},
  }
};

// ─── PROGRAMMA DATA: CR's en bonificaties per niveau/toestel ─────────────────
// Bron: Technisch programma A- en B-niveau, FRBG/KBT, editie juni 2026

const PROG = {
  A11: {
    general: {
      dscore: "Max. 8 hoogste FIG elementen (incl. afsprong) uit elementtabel A11",
      cr_max: "max. 2.00 ptn",
      bonus_cond: "0.50 ptn — 1x — enkel indien uitvoering per FIG-vereisten EN min. aantal CR's geteld",
      short_ex: [{pen:"0.00",els:"6 of meer"},{pen:"2.00",els:"5"},{pen:"4.00",els:"3-4"},{pen:"6.00",els:"1-2"}],
      beam_time: "Max. 1'30 · +0'10: -0.10 pt · >1'40: oefening beëindigd",
    },
    Sprong: {
      info: [
        {k:"Sprong 1",v:"Vrije keuze · D-score FIG · Pegasus 1m25 · Springplank (of Plankoline bij voorw. 1e vlucht mits -0.5)"},
        {k:"Sprong 2",v:"Yurchenko met salto · OF · Voorbereiding Yurchenko tot stand + val tot ruglig (Pegasus 1m25 + mattenberg 1m30 + trampolinematje)"},
        {k:"Eindscore",v:"Gemiddelde van de 2 sprongen"},
        {k:"Bonus",v:"0.5 op eindscore — 2 sprongen met salto uit verschillende groep met plank"},
        {k:"0-sprong",v:"3e aanloop toegelaten · Penalisatie -2.00 op eindscore"},
        {k:"Opwarming",v:"Zonder salto/mattenberg: max. 2 opw. + 1 wedstr. · Met salto: max. 3 opw. + 2 wedstr. (beste score telt mee)"},
      ],
    },
    "Brug ongelijk": {
      min_cr_bonus: 3,
      cr: [
        {id:"CR1",desc:"Kip + handstand gesloten",val:0.5},
        {id:"CR2",desc:"2 cirkelelementen min. 45°",val:0.5},
        {id:"CR3",desc:"Min. reus ½",val:0.5},
        {id:"CR4",desc:"Afsprong: gestrekte salto rugwaarts (vertrek vanuit handstand of reuzenzwaai) OF salto met dubbele breedte-as rotatie",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"1 cirkelelement min. C (kan CE uit CR2 zijn)",val:0.5},
        {id:"B2",desc:"Element met 360° LA-rotatie",val:0.5},
        {id:"B3",desc:"1 voorwaarts element min. B (reus voorwaarts of endo)",val:0.5},
      ],
      notes: ["CE = Cirkelelement","Jurering CR1: Kip mag herhaling zijn","Jurering CR3: bij reus ½ + reus ½ → vereiste toegekend indien 1 van beide binnen 30°, mits FIG-bestraffing","Geen aftrek (-0.50) voor niet-toestelspecifiek element indien ophurken of zolendraai geturnd wordt","Trainer verplicht aanwezig onder de brug","Bonussen 1x toekenbaar"],
    },
    Balk: {
      min_cr_bonus: 3,
      cr: [
        {id:"CR1",desc:"Verbinding min. 2 verschillende danselementen (1 sprong 180° spreiding) + Pirouette (gr.3) min. 360°",val:0.5},
        {id:"CR2",desc:"Acro-verbinding: tiktak vw/brug rw + flik",val:0.5},
        {id:"CR3",desc:"2 acro-elementen in verschillende richting (vw/zw en rw)",val:0.5},
        {id:"CR4",desc:"Afsprong: rondat of flik + hurksalto",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Flik + flik (vervangt CR2)",val:0.5},
        {id:"B2",desc:"Acroserie FIG",val:0.5},
        {id:"B3",desc:"Element min. D (kan meerdere keren toegekend worden)",val:0.5},
      ],
      notes: ["Flik open salto → 2× bonus (B1 én B2)","B3 kan meerdere keren toegekend worden"],
    },
    Grond: {
      min_cr_bonus: 3,
      cr: [
        {id:"CR1",desc:"Danspassage: 2 verschillende sprongen afzet 1 voet (direct/indirect verbonden), 1 sprong 180° spreiding + Pirouette min. B",val:0.5},
        {id:"CR2",desc:"Acroserie met 2 salto's waarvan 1 tempo-salto",val:0.5},
        {id:"CR3",desc:"Acroserie met overslag gestrekte salto voorwaarts",val:0.5},
        {id:"CR4",desc:"Acroserie met rondat flik schroef 360°",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Acroserie met schroef voorwaarts min. 360° (vervangt CR3)",val:0.5},
        {id:"B2",desc:"Acroserie met schroef rugwaarts min. 720° (vervangt CR4)",val:0.5},
        {id:"B3",desc:"Min. 3 gymnast. sprongen: min. 1 C en min. 1 B (kunnen deel zijn van CR1)",val:0.5},
        {id:"B4",desc:"Directe acro-verbinding: min. B + A",val:0.5},
      ],
      notes: [],
    },
  },

  // A12 and A13 share apparatus CRs but differ in min. CRs for bonus and D-score bonus thresholds
  A12: {
    general: {
      dscore: "Max. 8 hoogste elementen (incl. afsprong)",
      cr_max: "max. 2.00 ptn",
      bonus_cond: "0.5 ptn — 1x — min. 3 CR's (brug: 2) EN uitvoering per FIG-vereisten",
      short_ex: [{pen:"0.00",els:"6 of meer"},{pen:"2.00",els:"5"},{pen:"4.00",els:"3-4"},{pen:"6.00",els:"1-2"}],
      beam_time: "Max. 1'30 · +0'10: -0.10 pt · >1'40: beëindigd",
    },
    Sprong: {
      info: [
        {k:"D-score",v:"FIG · Pegasus 1m25 · Springplank zacht of hard FIG"},
        {k:"Aantal",v:"2 sprongen (zelfde of verschillend) · Eindscore: beste van de 2"},
        {k:"Bonus op 1e sprong B1",v:"D-score min. 3.6 EN E-score min. 8.3 → +0.3"},
        {k:"Bonus op 1e sprong B2",v:"D-score min. 4.6 EN E-score min. 8.3 → +0.5"},
        {k:"Bonus op beste sprong B3",v:"Gem. D-score min. 3.6 EN gem. E-score min. 8.3 (+ 2e sprong andere groep) → +0.5"},
        {k:"Opmerking",v:"B1 OF B2 wordt toegekend, niet beide. Extra mat 10cm bij salto op PV's."},
      ],
    },
    "Brug ongelijk": {
      min_cr_bonus: 2,
      cr: [
        {id:"CR1",desc:"Vluchtelement van hoge legger naar lage legger",val:0.5},
        {id:"CR2",desc:"Vluchtelement aan dezelfde legger",val:0.5},
        {id:"CR3",desc:"2 verschillende grepen min. B (niet in opzwaaien, op- en afsprongen)",val:0.5},
        {id:"CR4",desc:"Element zonder vlucht met min. 360° (niet als opsprong)",val:0.5},
      ],
      bonus: [
        {id:"B1 (A12)",desc:"2 cirkelelementen van verschillende stam min. C",val:0.5},
        {id:"B2",desc:"Vluchtelement aan dezelfde legger OF vluchtelement van HL naar LL",val:0.5},
        {id:"B3",desc:"Vluchtelement van lage legger naar hoge legger min. D",val:0.5},
        {id:"D-score bonus A12",desc:"D ≥ 3.2 EN E ≥ 7.0 → +0.3  ·  D ≥ 3.6 EN E ≥ 7.0 → +0.5 (indien 2 CR's geteld)",val:"0.3/0.5"},
      ],
      notes: ["Jurering B3: geen bestraffing tussenzwaai na Shaposhnikova indien verbonden met kip","Bonussen 1x toekenbaar","A12: trainer verplicht aanwezig onder brug"],
    },
    Balk: {
      min_cr_bonus: 3,
      cr: [
        {id:"CR1",desc:"Verbinding min. 2 verschillende danselementen, 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Pirouette (gr.3) min. 360°",val:0.5},
        {id:"CR3",desc:"Acroserie van min. 2 elementen met vlucht waarvan 1 salto",val:0.5},
        {id:"CR4",desc:"Acro-elementen met vlucht in verschillende richting (vw/zw en rw)",val:0.5},
      ],
      bonus: [
        {id:"B1 (A12)",desc:"2 acro-elementen min. D",val:0.5},
        {id:"B2",desc:"Acroserie van min. 3 elementen waarvan min. 1 salto",val:0.5},
        {id:"B3",desc:"2 gymnastische elementen min. D",val:0.5},
        {id:"D-score bonus A12",desc:"D ≥ 4.0 EN E ≥ 7.0 → +0.3  ·  D ≥ 4.5 EN E ≥ 7.0 → +0.5 (indien 3 CR's)",val:"0.3/0.5"},
      ],
      notes: ["Bonussen 1x toekenbaar"],
    },
    Grond: {
      min_cr_bonus: 3,
      cr: [
        {id:"CR1",desc:"Danspassage: 2 verschillende sprongen afzet 1 voet (direct/indirect verbonden), 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Salto met lengte-as rotatie min. 360° in acroserie",val:0.5},
        {id:"CR3",desc:"Salto met dubbele breedte-as rotatie in acroserie",val:0.5},
        {id:"CR4",desc:"Salto rugwaarts en salto voorwaarts in dezelfde of andere acroserie",val:0.5},
      ],
      bonus: [
        {id:"B1 (A12)",desc:"1 acro-element min. D EN 1 acro-element min. C",val:0.5},
        {id:"B2",desc:"2 acro-elementen min. D OF 2 gymnast. elementen min. D",val:0.5},
        {id:"B3",desc:"1 acro-element min. E  OF  directe acro-verb. min. C+B of D+A  OF  indirecte acro-verb. min. B+C of A+A+C",val:0.5},
        {id:"D-score bonus A12",desc:"D ≥ 3.5 EN E ≥ 7.0 → +0.3  ·  D ≥ 4.0 EN E ≥ 7.0 → +0.5 (indien 3 CR's)",val:"0.3/0.5"},
      ],
      notes: ["Bonussen 1x toekenbaar"],
    },
  },

  A13: {
    general: {
      dscore: "Max. 8 hoogste elementen (incl. afsprong)",
      cr_max: "max. 2.00 ptn",
      bonus_cond: "0.5 ptn — 1x — min. 4 CR's (brug: 3) EN uitvoering per FIG-vereisten",
      short_ex: [{pen:"0.00",els:"6 of meer"},{pen:"4.00",els:"5"},{pen:"6.00",els:"3-4"},{pen:"8.00",els:"1-2"}],
      beam_time: "Max. 1'30 · +0'10: -0.10 pt · >1'40: beëindigd",
    },
    Sprong: {
      info: [
        {k:"D-score",v:"FIG · Pegasus 1m25 · Springplank zacht of hard FIG"},
        {k:"Aantal",v:"2 sprongen (zelfde of verschillend) · Eindscore: beste van de 2"},
        {k:"Bonus op 1e sprong B1",v:"D-score min. 3.6 EN E-score min. 8.3 → +0.3"},
        {k:"Bonus op 1e sprong B2",v:"D-score min. 4.6 EN E-score min. 8.3 → +0.5"},
        {k:"Bonus op beste sprong B3",v:"Gem. D-score min. 3.6 EN gem. E-score min. 8.3 (+ 2e sprong andere groep) → +0.5"},
        {k:"Opmerking",v:"B1 OF B2 wordt toegekend, niet beide. Extra mat 10cm bij salto op PV's."},
      ],
    },
    "Brug ongelijk": {
      min_cr_bonus: 3,
      cr: [
        {id:"CR1",desc:"Vluchtelement van hoge legger naar lage legger",val:0.5},
        {id:"CR2",desc:"Vluchtelement aan dezelfde legger",val:0.5},
        {id:"CR3",desc:"2 verschillende grepen min. B (niet in opzwaaien, op- en afsprongen)",val:0.5},
        {id:"CR4",desc:"Element zonder vlucht met min. 360° (niet als opsprong)",val:0.5},
      ],
      bonus: [
        {id:"B2",desc:"Vluchtelement aan dezelfde legger OF vluchtelement van HL naar LL",val:0.5},
        {id:"B3",desc:"Vluchtelement van lage legger naar hoge legger min. D",val:0.5},
        {id:"D-score bonus A13",desc:"D ≥ 3.6 EN E ≥ 7.0 → +0.3  ·  D ≥ 4.2 EN E ≥ 7.0 → +0.5 (indien 3 CR's)",val:"0.3/0.5"},
      ],
      notes: ["Jurering B3: geen bestraffing tussenzwaai na Shaposhnikova indien verbonden met kip"],
    },
    Balk: {
      min_cr_bonus: 4,
      cr: [
        {id:"CR1",desc:"Verbinding min. 2 verschillende danselementen, 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Pirouette (gr.3) min. 360°",val:0.5},
        {id:"CR3",desc:"Acroserie van min. 2 elementen met vlucht waarvan 1 salto",val:0.5},
        {id:"CR4",desc:"Acro-elementen met vlucht in verschillende richting (vw/zw en rw)",val:0.5},
      ],
      bonus: [
        {id:"B2",desc:"Acroserie van min. 3 elementen waarvan min. 1 salto",val:0.5},
        {id:"B3",desc:"2 gymnastische elementen min. D",val:0.5},
        {id:"D-score bonus A13",desc:"D ≥ 4.5 EN E ≥ 7.0 → +0.3  ·  D ≥ 5.0 EN E ≥ 7.0 → +0.5 (indien 4 CR's)",val:"0.3/0.5"},
      ],
      notes: [],
    },
    Grond: {
      min_cr_bonus: 4,
      cr: [
        {id:"CR1",desc:"Danspassage: 2 verschillende sprongen afzet 1 voet (direct/indirect verbonden), 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Salto met lengte-as rotatie min. 360° in acroserie",val:0.5},
        {id:"CR3",desc:"Salto met dubbele breedte-as rotatie in acroserie",val:0.5},
        {id:"CR4",desc:"Salto rugwaarts en salto voorwaarts in dezelfde of andere acroserie",val:0.5},
      ],
      bonus: [
        {id:"B2",desc:"2 acro-elementen min. D OF 2 gymnast. elementen min. D",val:0.5},
        {id:"B3",desc:"1 acro-element min. E  OF  directe acro-verb. min. C+B of D+A  OF  indirecte acro-verb. min. B+C of A+A+C",val:0.5},
        {id:"D-score bonus A13",desc:"D ≥ 4.0 EN E ≥ 7.0 → +0.3  ·  D ≥ 4.5 EN E ≥ 7.0 → +0.5 (indien 4 CR's)",val:"0.3/0.5"},
      ],
      notes: [],
    },
  },

  B11: {
    general: {
      dscore: "Max. 8 hoogste elementen (incl. afsprong) uit elementtabel B11-12 jaar. Balk & grond: acro-elementen gelimiteerd tot B-waarde.",
      cr_max: "max. 2.00 ptn",
      bonus_cond: "0.5 ptn — 1x — uitvoering per FIG-vereisten voor bonussen",
      short_ex: [{pen:"0.00 (brug)",els:"—"},{pen:"0.00 (b/g)",els:"6 of meer"},{pen:"4.00",els:"3-4"},{pen:"6.00",els:"1-2"}],
      beam_time: "Max. 1'30 · +0'10: -0.10 pt · >1'40: beëindigd, max. 7 elementen D-score",
    },
    Sprong: {
      info: [
        {k:"D-score",v:"Springplank: 5 ptn · Plankoline: 4.5 ptn"},
        {k:"Sprong",v:"Overslag (enige optie)"},
        {k:"Aantal",v:"2 sprongen · Eindscore: beste sprong"},
        {k:"Materiaal",v:"Pegasus 1m25 · Springplank of plankoline"},
      ],
    },
    "Brug ongelijk": {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Kip of lange kip — opzwaai min. 45°* (direct verbonden, met FIG-bestraffing)",val:0.5},
        {id:"CR2",desc:"Gedevalueerd cirkelelement min. B (met FIG-bestraffing)",val:0.5},
        {id:"CR3",desc:"Zolendraai (benen gesloten of gespreid)",val:0.5},
        {id:"CR4",desc:"¾ reuzenzwaai + buikdraai rugwaarts",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Kip of lange kip — handstand (gespreid of gesloten) direct verbonden",val:0.5},
        {id:"B2",desc:"1 cirkelelement min. 45° (met FIG-bestraffing)",val:0.5},
        {id:"B3",desc:"Reuzenzwaai (kan CR4 vervangen)",val:0.5},
        {id:"B4",desc:"Afsprong: gestrekte salto rugwaarts",val:0.5},
      ],
      notes: ["Bonussen 1x toekenbaar","Geen aftrek (-0.50) voor niet-toestelspecifiek element indien ophurken of zolendraai (CR3)","CR1: opzwaai = benen gesloten element — gesloten handstand geeft bonus + vereiste; gespreide handstand geeft enkel bonus","Trainer verplicht aanwezig onder de brug","Afsprong zwaai ½ draai = A-element"],
    },
    Balk: {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Verbinding min. 2 verschillende danselementen (1 sprong 180°) + Pirouette min. 360° (gr.3)",val:0.5},
        {id:"CR2",desc:"Menichelli",val:0.5},
        {id:"CR3",desc:"2 acro-elementen in verschillende richting (vw/zw en rw)",val:0.5},
        {id:"CR4",desc:"Afsprong: rad + salto",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Gymnastische sprong min. C",val:0.5},
        {id:"B2",desc:"Pirouette min. B",val:0.5},
        {id:"B3",desc:"Handstand + menichelli (verb.) OF brug rw + menichelli (verb.) OF tiktak vw + menichelli (verb.) — elk kan CR2 vervangen",val:0.5},
        {id:"B4",desc:"Afsprong: rondat + gehurkte salto (vervangt CR4)",val:0.5},
      ],
      notes: ["B3: handstand binnen 10° — indien geen 2 sec. → B3 met -0.3 bestraffing. Mag gesloten of gespreid.","Bonussen 1x toekenbaar"],
    },
    Grond: {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Danspassage: 2 verschillende sprongen afzet 1 voet (direct/indirect verbonden), 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Acroserie met gestrekte salto rugwaarts",val:0.5},
        {id:"CR3",desc:"Overslag hurksalto",val:0.5},
        {id:"CR4",desc:"Oefening met 3 acroseries",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Pirouette min. B (vervangt pirouette in CR1)",val:0.5},
        {id:"B2",desc:"Gymnast. sprong min. B met 180° spreiding (buiten CR1)",val:0.5},
        {id:"B3",desc:"Acroserie met rugwaarts acro-element min. B (kan CR2 vervangen)",val:0.5},
        {id:"B4",desc:"Acroserie met voorwaarts acro-element min. B (kan CR3 vervangen)",val:0.5},
      ],
      notes: [],
    },
  },

  B12: {
    general: {
      dscore: "Max. 8 hoogste elementen (incl. afsprong) uit elementtabel B11-12 jaar",
      cr_max: "max. 2.00 ptn",
      bonus_cond: "0.2 ptn — meerdere keren — mits uitvoering per FIG-vereisten voor bonussen",
      short_ex: [{pen:"0.00",els:"6 of meer"},{pen:"2.00",els:"5"},{pen:"4.00",els:"3-4"},{pen:"6.00",els:"1-2"}],
      beam_time: "Max. 1'30 · +0'10: -0.10 pt · >1'40: beëindigd, max. 7 elementen",
    },
    Sprong: {
      info: [
        {k:"D-score",v:"FIG · Pegasus 1m25 · Springplank zacht of hard FIG"},
        {k:"Aantal",v:"2 sprongen (zelfde of verschillend) · Eindscore: beste sprong"},
        {k:"Opmerking",v:"Sprongen met voorw. 1e vlucht mogen met plankoline (-0.5 D). Extra mat 10cm bij salto op PV's."},
      ],
    },
    "Brug ongelijk": {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Kip of lange kip — handstand (gespreid of gesloten) direct verbonden",val:0.5},
        {id:"CR2",desc:"Cirkelelement min. 45° (met FIG-bestraffing)",val:0.5},
        {id:"CR3",desc:"Reuzenzwaai",val:0.5},
        {id:"CR4",desc:"Afsprong: streksalto",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Cirkelelement min. C (kan CR2 vervangen)",val:0.2},
        {id:"B2",desc:"Min. 2 cirkelelementen uit verschillende stam min. B",val:0.2},
        {id:"Comb.",desc:"Min. B + B (verschillend) — indien zonder val",val:0.2},
      ],
      notes: ["Trainer verplicht aanwezig","CR1: ook bij 2e poging toegekend","Geen bestraffing niet-toestelspecifiek (-0.5) indien zolendraai + springen naar boven"],
    },
    Balk: {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Verbinding min. 2 verschillende danselementen, 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Pirouette (gr.3) of rol of flair*",val:0.5},
        {id:"CR3",desc:"Handstand + menichelli (verb.) OF brug rw + menichelli (verb.) OF tiktak vw + menichelli (verb.)",val:0.5},
        {id:"CR4",desc:"Acro-elementen in verschillende richting (vw/zw en rw)",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Gymnastisch element min. C",val:0.2},
        {id:"B2",desc:"Afsprong: rondat + salto",val:0.2},
        {id:"Comb.",desc:"Min. B + B (mixed of acro-verbinding)",val:0.2},
      ],
      notes: ["CR2: handstand binnen 10° — geen 2 sec. → CR2 met -0.3 bestraffing","Acro-element C of hoger mag niet geturnd worden","*Flair CoP 25-28: 1.303, 1.403, 1.304, 1.207, 1.308, 1.514, 4.203, 4.204, 4.304, 4.305, 4.206, 4.306, 4.307, 5.405, 5.505"],
    },
    Grond: {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Danspassage: 2 verschillende sprongen afzet 1 voet (direct/indirect verbonden), 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Acroserie met salto met min. 360° LA-draai",val:0.5},
        {id:"CR3",desc:"Acroserie met 2 salto's (dezelfde of verschillend)",val:0.5},
        {id:"CR4",desc:"Salto vw/zw en rw in acroserie",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"2 pirouettes uit verschillende stam min. B",val:0.2},
        {id:"B2",desc:"Gymnast. sprong min. B met 180° spreiding (buiten CR1)",val:0.2},
        {id:"B3",desc:"2 acro-elementen min. B",val:0.2},
        {id:"Comb.",desc:"Directe of indirecte acro-verbinding: min. B + A",val:0.2},
      ],
      notes: ["CR 2, 3 en 4 moeten geturnd worden in een acroserie"],
    },
  },

  B13: {
    general: {
      dscore: "Max. 8 hoogste elementen (incl. afsprong) uit FIG CoP 2025-2028",
      cr_max: "max. 2.00 ptn",
      bonus_cond: "0.2 ptn — meerdere keren — mits uitvoering per FIG-vereisten voor bonussen",
      short_ex: [{pen:"0.00",els:"6 of meer"},{pen:"2.00",els:"5"},{pen:"4.00",els:"3-4"},{pen:"6.00",els:"1-2"}],
      beam_time: "Max. 1'30 · +0'10: -0.10 pt · >1'40: beëindigd, max. 7 elementen",
    },
    Sprong: {
      info: [
        {k:"D-score",v:"FIG · Pegasus 1m25 · Springplank zacht of hard FIG"},
        {k:"Aantal",v:"2 sprongen (zelfde of verschillend) · Eindscore: beste sprong"},
        {k:"Opmerking",v:"Extra mat 10cm bij salto op PV's"},
      ],
    },
    "Brug ongelijk": {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Kip of lange kip — handstand (gespreid of gesloten) direct verbonden",val:0.5},
        {id:"CR2",desc:"Cirkelelement min. 45° (met FIG-bestraffing)",val:0.5},
        {id:"CR3",desc:"Reuzenzwaai",val:0.5},
        {id:"CR4",desc:"Afsprong: streksalto",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Cirkelelement C (kan CR2 vervangen)",val:0.2},
        {id:"B2",desc:"Min. 2 cirkelelementen uit verschillende stam min. B",val:0.2},
        {id:"Comb.",desc:"Min. B + B (verschillend)",val:0.2},
      ],
      notes: ["CR1: ook bij 2e poging toegekend","Geen bestraffing niet-toestelspecifiek (-0.5) indien zolendraai + springen"],
    },
    Balk: {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Verbinding min. 2 verschillende danselementen, 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Pirouette (gr.3) of rol of flair*",val:0.5},
        {id:"CR3",desc:"Acro-serie: Menichelli + menichelli (verb.) OF brug rw + menichelli (verb.) OF tiktak vw + menichelli (verb.)",val:0.5},
        {id:"CR4",desc:"Acro-elementen in verschillende richting (vw/zw en rw)",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Acro- of danselement min. C",val:0.2},
        {id:"B2",desc:"Afsprong: rondat salto",val:0.2},
        {id:"Comb.",desc:"Min. B + B (mixed of acro-verbinding)",val:0.2},
      ],
      notes: ["*Flair CoP 25-28: 1.303, 1.403, 1.304, 1.207, 1.308, 1.514, 4.203, 4.204, 4.304, 4.305, 4.206, 4.306, 4.307, 5.405, 5.505"],
    },
    Grond: {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Danspassage: 2 verschillende sprongen afzet 1 voet (direct/indirect verbonden), 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Acroserie met salto met min. 360° LA-draai",val:0.5},
        {id:"CR3",desc:"Acroserie met 2 salto's (dezelfde of verschillend)",val:0.5},
        {id:"CR4",desc:"Salto vw/zw en rw in acroserie",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"2 pirouettes uit verschillende stam min. B",val:0.2},
        {id:"B2",desc:"Gymnast. sprong min. C met 180° spreiding (buiten CR1)",val:0.2},
        {id:"B3",desc:"Min. 1 acro-element min. B en 1 acro-element min. C",val:0.2},
        {id:"Comb.",desc:"Directe of indirecte acro-verbinding: min. B + A",val:0.2},
      ],
      notes: [],
    },
  },

  B1415: {
    general: {
      dscore: "Max. 8 hoogste elementen (incl. afsprong) uit FIG CoP 2025-2028",
      cr_max: "max. 2.00 ptn",
      bonus_cond: "0.2 of 0.5 ptn — meerdere keren — mits uitvoering per FIG-vereisten. FIG-bonificaties ook toegekend.",
      short_ex: [{pen:"0.00",els:"6 of meer"},{pen:"2.00",els:"5"},{pen:"4.00",els:"3-4"},{pen:"6.00",els:"1-2"}],
      beam_time: "Max. 1'30 · +0'10: -0.10 pt · >1'40: beëindigd, max. 7 elementen",
    },
    Sprong: {
      info: [
        {k:"D-score",v:"FIG · Pegasus 1m25 · Springplank zacht of hard FIG"},
        {k:"Aantal",v:"2 sprongen (zelfde of verschillend) · Eindscore: beste sprong"},
        {k:"Opmerking",v:"Extra mat 10cm bij salto op PV's"},
      ],
    },
    "Brug ongelijk": {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Reuzenzwaai",val:0.5},
        {id:"CR2",desc:"2 cirkelelementen min. B",val:0.5},
        {id:"CR3",desc:"Vluchtelement HL naar LL OF vluchtelement aan zelfde legger",val:0.5},
        {id:"CR4",desc:"Element in andere greep min. B OF reuzenzwaai met min. 180° LA-draai OF cirkelelement met min. 180° LA-draai",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"Cirkelelement min. C",val:0.2},
        {id:"B2",desc:"Vluchtelement LL naar HL",val:0.2},
        {id:"B3",desc:"Afsprong met dubbele BA-rotatie",val:0.2},
        {id:"B4",desc:"Element met min. 360° LA-draai (zonder vlucht)",val:0.5},
        {id:"B5",desc:"Element met vlucht min. C",val:0.5},
        {id:"Comb.",desc:"Min. B + C",val:0.2},
      ],
      notes: ["Reus ½ of cirkelelement ½ draai niet binnen 10° → devaluatie (1 lager) maar CR4 nog toekenbaar","Wippertje: FIG-regel — bij tussenzwaai geen bonus"],
    },
    Balk: {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Verbinding min. 2 verschillende danselementen, 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"B14-15: Menichelli + menichelli/flik/flik tot rijzit  OF  acroserie FIG · B16+: Acroserie FIG",val:0.5},
        {id:"CR3",desc:"Pirouette (gr.3) of rol of flair*",val:0.5},
        {id:"CR4",desc:"Acro-elementen in verschillende richting (vw/zw en rw)",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"1 acro-element min. D en 1 acro-element min. C",val:0.2},
        {id:"B2",desc:"2 gymnast. elementen min. C",val:0.2},
        {id:"B3",desc:"Vanaf het 2de D-element (acro of gymnast.)",val:0.2},
        {id:"Acro comb.",desc:"Min. B + B (verschillend) — enkel vlucht, mag met rebounding",val:0.2},
        {id:"Seriebonus",desc:"Min. A+B+B (mag zonder vlucht, met afsprong)",val:0.2},
        {id:"Mixed/gymn.",desc:"Min. C + C (verschillend)  OF  Min. B + D",val:0.2},
      ],
      notes: ["*Flair CoP 25-28: 1.303, 1.403, 1.304, 1.207, 1.308, 1.514, 4.203, 4.204, 4.304, 4.305, 4.206, 4.306, 4.307, 5.405, 5.505"],
    },
    Grond: {
      min_cr_bonus: 0,
      cr: [
        {id:"CR1",desc:"Danspassage: 2 verschillende sprongen afzet 1 voet (direct/indirect verbonden), 1 sprong 180° spreiding",val:0.5},
        {id:"CR2",desc:"Acroserie met voorw. salto 360° LA-draai  OF  acroserie met rw. salto min. 720° LA-draai",val:0.5},
        {id:"CR3",desc:"Acroserie met 2 salto's direct verbonden min. 1 B-salto  OF  acroserie met rw. salto dubbele BA-rotatie",val:0.5},
        {id:"CR4",desc:"Salto vw/zw en rw in acroserie",val:0.5},
      ],
      bonus: [
        {id:"B1",desc:"2 acro-elementen min. C (kan in CR2, 3 en/of 4 zitten)",val:0.2},
        {id:"B2",desc:"3e acro-element min. C",val:0.2},
        {id:"B3",desc:"Acro-element min. D",val:0.2},
        {id:"B4",desc:"3 gymnast. elementen min. C (kan in CR1 zitten)",val:0.2},
        {id:"Ind. acro",desc:"Min. B+B  ·  Min. C+A",val:0.2},
        {id:"Dir. acro",desc:"Min. C+A  ·  Min. B+B",val:0.2},
        {id:"Mixed",desc:"Min. C+A (salto + dans)",val:0.2},
      ],
      notes: [],
    },
  },
};

// Map level IDs to PROG keys
const PROG_MAP = {
  A11:"A11", B11:"B11", B12:"B12",
  // C levels have no Belgian CR program (use FIG CoP) — except via C-program doc later
};
// A12/A13 share apparatus CRs but differ in bonus thresholds — show as separate
// We'll add A12/A13 as sub-levels under the A level selector via a note

// ─── VAULT DATA ───────────────────────────────────────────────────────────────
const VAULT_NAMES = {
  "1.00":"Handspring fwd","1.01":"Handspring fwd – ½ turn (180°) off",
  "1.02":"Handspring fwd – 1/1 turn (360°) off","1.03":"Handspring fwd – 1½ turn (540°) off (Kim)",
  "1.10":"Yamashita","1.11":"Yamashita – ½ turn (180°) off","1.12":"Yamashita – 1/1 turn (360°) off",
  "1.20":"Handspring fwd ½ turn on – repulsion off","1.21":"Handspring fwd ½ turn on – ½ turn off",
  "1.22":"Handspring fwd ½ turn on – 1/1 turn off","1.23":"Handspring fwd ½ turn on – 1½ turn off",
  "1.40":"Round-off, flic-flac on – repulsion off",
  "1.50":"Round-off, flic-flac ½ turn on – Handspring fwd off",
  "1.51":"Round-off, flic-flac ½ turn on – ½ turn off",
  "1.52":"Round-off, flic-flac ½ turn on – 1/1 turn off",
  "3.10":"Tsukahara tucked (Tourischeva)","3.20":"Tsukahara piked",
  "4.10":"Round-off, flic-flac on – tucked salto bwd off (Yurchenko)",
};

const VAULTS = {
  C12:[{nr:"1.00",d:1.60},{nr:"1.01",d:2.00},{nr:"1.20",d:1.60},{nr:"1.21",d:2.40}],
  C13:[{nr:"1.00",d:1.60},{nr:"1.01",d:2.00},{nr:"1.02",d:2.60},{nr:"1.10",d:2.00},{nr:"1.11",d:2.40},{nr:"1.12",d:2.80},{nr:"1.20",d:1.60},{nr:"1.21",d:2.40},{nr:"1.22",d:2.60},{nr:"1.40",d:2.00}],
  C1415:[{nr:"1.00",d:1.60},{nr:"1.01",d:2.00},{nr:"1.02",d:2.60},{nr:"1.03",d:3.20},{nr:"1.10",d:2.00},{nr:"1.11",d:2.40},{nr:"1.12",d:2.80},{nr:"1.20",d:1.60},{nr:"1.21",d:2.40},{nr:"1.22",d:2.60},{nr:"1.23",d:3.20},{nr:"1.40",d:2.00},{nr:"1.50",d:2.20},{nr:"1.51",d:2.60},{nr:"1.52",d:3.00}],
  C16plus_I:[{nr:"1.00",d:1.60},{nr:"1.01",d:2.00},{nr:"1.02",d:2.60},{nr:"1.03",d:3.20},{nr:"1.10",d:2.00},{nr:"1.11",d:2.40},{nr:"1.12",d:2.80},{nr:"1.20",d:1.60},{nr:"1.21",d:2.40},{nr:"1.22",d:2.60},{nr:"1.23",d:3.20},{nr:"1.40",d:2.00},{nr:"1.50",d:2.20},{nr:"1.51",d:2.60},{nr:"1.52",d:3.00}],
  C16plus_III:[{nr:"3.10",d:3.20},{nr:"3.20",d:3.40}],
  C16plus_IV:[{nr:"4.10",d:3.00}],
};

// ─── LEVEL CONFIG ─────────────────────────────────────────────────────────────
const LEVELS = [
  {id:"A11",label:"A – 11 jaar",color:"#d97706",bg:"#fffbeb",border:"#fcd34d",cat:"A"},
  {id:"A12",label:"A – 12 jaar",color:"#d97706",bg:"#fffbeb",border:"#fcd34d",cat:"A"},
  {id:"A13",label:"A – 13 jaar",color:"#d97706",bg:"#fffbeb",border:"#fcd34d",cat:"A"},
  {id:"B11",label:"B – 11 jaar",color:"#2563eb",bg:"#eff6ff",border:"#93c5fd",cat:"B"},
  {id:"B12",label:"B – 12 jaar",color:"#2563eb",bg:"#eff6ff",border:"#93c5fd",cat:"B"},
  {id:"B13",label:"B – 13 jaar",color:"#2563eb",bg:"#eff6ff",border:"#93c5fd",cat:"B"},
  {id:"B1415",label:"B – 14-15/16+",color:"#2563eb",bg:"#eff6ff",border:"#93c5fd",cat:"B"},
  {id:"C11",label:"C – 11 jaar",color:"#059669",bg:"#ecfdf5",border:"#6ee7b7",cat:"C"},
  {id:"C12",label:"C – 12 jaar",color:"#059669",bg:"#ecfdf5",border:"#6ee7b7",cat:"C"},
  {id:"C13",label:"C – 13 jaar",color:"#059669",bg:"#ecfdf5",border:"#6ee7b7",cat:"C"},
  {id:"C1415",label:"C – 14/15 jaar",color:"#059669",bg:"#ecfdf5",border:"#6ee7b7",cat:"C"},
  {id:"C16plus",label:"C – 16+ jaar",color:"#059669",bg:"#ecfdf5",border:"#6ee7b7",cat:"C"},
];

const APPS = ["Programma","Sprong","Brug ongelijk","Balk","Grond"];
const ICONS = {Programma:"📋",Sprong:"🏃","Brug ongelijk":"🔄",Balk:"⚖️",Grond:"🌀"};

// ─── UB GROUP STRUCTURE ────────────────────────────────────────────────────────
const UB_GROUPS = [
  {id:"1",name:"Mounts / Opstijgen",fig:"I",
   codes:["1.101","1.102","1.103","1.104","1.202","1.204","1.105","1.106","1.206","1.304","1.306","1.406","1.207","1.307","1.407","1.208","1.308","1.408","1.409","1.210","1.310","1.410","1.411","nF-ub1-LL","nF-ub1-var"]},
  {id:"2",name:"Casts & Clear hip circles",fig:"II",
   codes:["2.101","2.201","2.301","2.401","2.202","2.302","2.303","2.403","2.104","2.404","2.105","2.305","2.405","2.206","2.306","2.406","2.307","2.407","nF-ub2-kip","nF-ub2-30","nF-ub5-s4"]},
  {id:"3",name:"Giant circles",fig:"III",
   codes:["3.201","3.301","3.401","3.402","3.403","3.304","3.404","3.405","3.206","3.306","3.307","3.407","3.308","3.408","3.309","3.409","3.310","3.410","nF-ub3-ov","nF-ub3-st"]},
  {id:"4",name:"Stalder circles",fig:"IV",
   codes:["4.101","4.201","4.401","4.302","4.402","4.103","4.403","4.104","4.304","4.404","4.205","4.305","4.405","4.406","4.107","4.407","4.208","4.308"]},
  {id:"5",name:"Pike circles / Swing elements",fig:"V",
   codes:["5.101","5.301","5.401","5.202","5.302","5.402","5.303","5.104","5.304","5.404","5.105","5.305","5.405","5.106","5.306","5.406","5.207","5.307","5.108","5.308","5.408","5.409","5.410"]},
  {id:"6",name:"Dismounts / Afsprong",fig:"VI",
   codes:["6.101","6.201","6.301","6.401","6.102","6.302","6.402","6.303","6.403","6.104","6.204","6.304","6.404","6.108","6.208","6.209","6.309","6.409","6.210","6.310","nF-ub6-a","nF-ub6-b"]},
];

const BB_GROUPS = [
  {id:"1",name:"Mounts / Opstijgen",fig:"I",
   codes:["1.101","1.201","1.401","1.102","1.302","1.402","1.103","1.204","1.304","1.105","1.305","1.405","1.106","1.207","1.108","1.208","1.308","1.309","1.210","1.310","1.211","1.311","1.411","1.214","1.215","1.315","1.416","1.516","nF-bb1-a"]},
  {id:"2",name:"Gymnastic leaps, jumps & hops",fig:"II",
   codes:["2.101","2.201","2.301","2.302","2.402","2.203","2.303","2.403","2.204","2.404","2.105","2.305","2.405","2.505","2.206","2.306","2.107","2.207","2.407","2.108","2.208","2.408","2.209","2.110","2.210","2.310","2.211","2.311","2.411","2.112","2.212","2.412","2.512"]},
  {id:"3",name:"Gymnastic turns / Draaien",fig:"III",
   codes:["3.101","3.201","3.401","3.501","3.302","3.402","3.403","3.304","3.404","3.504","3.305","3.405","3.505","3.206","3.406","3.207","3.307","3.407","3.507","3.208","3.408"]},
  {id:"4",name:"Holds & acrobatic non-flight",fig:"IV",
   codes:["4.101","4.102","4.103","4.203","4.104","4.204","4.304","4.105","4.305","4.206","4.306","4.107","4.108","4.208","4.308","4.109","4.209","4.309","4.210","4.310","nF-bb4-a"]},
  {id:"5",name:"Acrobatic flight",fig:"V",
   codes:["5.201","5.301","5.401","5.501","5.202","5.302","5.204","5.304","5.404","5.206","5.306","5.207","5.208","5.408","5.310","5.410","5.510","5.411","5.312","5.512"]},
  {id:"6",name:"Dismounts / Afsprong",fig:"VI",
   codes:["6.101","6.201","6.301","6.102","6.202","6.302","6.402","6.203","6.303","6.403","6.104","6.204","6.304","6.404","6.405","6.505","6.106","6.206","6.306","6.406","6.207","6.307","6.407"]},
];

const FX_GROUPS = [
  {id:"1",name:"Gymnastic leaps, jumps & hops",fig:"I",
   codes:["1.101","1.201","1.301","1.202","1.302","1.402","1.103","1.203","1.104","1.204","1.304","1.404","1.105","1.205","1.305","1.405","1.106","1.107","1.207","1.307","1.407","1.108","1.109","1.209","1.309","1.409","1.110","1.310","1.111","1.211","1.311","1.112","1.212","1.113","1.313","1.114","1.214","nF-fx1-a"]},
  {id:"2",name:"Gymnastic turns / Draaien",fig:"II",
   codes:["2.101","2.201","2.301","2.202","2.402","2.203","2.403","2.404","2.205","2.206","2.207","2.307","2.407","2.208"]},
  {id:"3",name:"Hand support elements",fig:"III",
   codes:["3.101","3.201","3.103","3.203","3.104","3.105","3.305","3.106","3.107","3.207","nF-fx3-a"]},
  {id:"4",name:"Saltos forward & sideward",fig:"IV",
   codes:["4.101","4.201","4.202","4.302","4.402","4.103","4.104","4.105","4.205","nF-fx4-WAG"]},
  {id:"5",name:"Saltos backward",fig:"V",
   codes:["5.101","5.201","5.301","5.401","5.402","5.104","5.204","5.304"]},
];

// ─── A* ELEMENTS: non-FIG, C-programma only (waarde 0.1) ─────────────────────
// These exist only in the Belgian C competition program, not in FIG CoP.
// Codes use "nF-" prefix to distinguish from FIG codes.
const ASTAR = {
  ub: {
    // Groep 1 – Mounts
    "nF-ub1-LL":    {dv:"A*", n:"Non-FIG: LL-opstijgen (laag-laag zweef variant)"},
    "nF-ub1-var":   {dv:"A*", n:"Non-FIG: opstijgen variant (Belgisch programma)"},
    // Groep 2 – Kip / swing elements
    "nF-ub2-kip":   {dv:"A*", n:"Non-FIG: kip horizontaal (Belgisch programma)"},
    "nF-ub2-30":    {dv:"A*", n:"Non-FIG: 30° variant kip/cast (Belgisch programma)"},
    // Groep 3 – Giant circles / overvliegen non-FIG variants
    "nF-ub3-ov":    {dv:"A*", n:"Non-FIG: overvliegen variant (Belgisch programma)"},
    "nF-ub3-st":    {dv:"A*", n:"Non-FIG: overvliegen vanuit steun (Belgisch programma)"},
    // Groep 2 – non-FIG cast/kip variant C12+
    "nF-ub5-s4":    {dv:"A*", n:"Non-FIG: cast/kip s4-variant gr.2 (Belgisch programma, C12+)"},
    // Groep 6 – Afsprong
    "nF-ub6-a":     {dv:"A*", n:"Non-FIG: afsprong variant A (Belgisch programma)"},
    "nF-ub6-b":     {dv:"A*", n:"Non-FIG: afsprong variant B (Belgisch programma)"},
  },
  bb: {
    "nF-bb1-a":     {dv:"A*", n:"Non-FIG: opstijgen A* (Belgisch programma)"},
    "nF-bb4-a":     {dv:"A*", n:"Non-FIG: acrobatisch non-flight A* (Belgisch programma)"},
  },
  fx: {
    "nF-fx1-a":     {dv:"A*", n:"Non-FIG: dans/sprong A* (Belgisch programma)"},
    "nF-fx3-a":     {dv:"A*", n:"Non-FIG: hand support A* (Belgisch programma)"},
    "nF-fx4-WAG":   {dv:"A*", n:"Non-FIG: WAG verbindingselement gr.1 (Belgisch programma)"},
  },
};

// ─── C-LEVEL PERMITTED ELEMENTS ───────────────────────────────────────────────
// Based on visual inspection of all pages of the C-elementtabel PDF (versie mei 2026)
// UB: FIG WAG CoP 2025-2028 codes, verified per column (A*, A, B, C) per level

const C_UB = {
  // C11: Gr1: 1.01(A*), 1.03(A), 1.04(A), non-FIG LL, non-FIG var
  //      Gr2: 2.01hor(A*), 2.04 O-(A), 2.05 O(A), non-FIG kip
  //      Gr3: 3.01(A*), non-FIG ov, non-FIG vanuit steun
  //      Gr4: 4.01(A), 4.04(A) → 4.104, 4.101
  //      Gr5: 5.07(A*), 5.08(A) → sole circles
  //      Gr6: 6.01 A*/A variants, 6.02 A*/A variants, 6.04(A) flyaway
  C11: new Set([
    "1.101","1.103","1.104",
    "2.101","2.104","2.105",
    "nF-ub2-kip",
    "3.201",
    "4.104","4.101",
    "5.108",
    "6.101","6.102","6.104",
    "nF-ub1-LL","nF-ub1-var","nF-ub3-ov","nF-ub3-st","nF-ub6-a","nF-ub6-b",
  ]),
  // C12: adds 1.02(A/B), 1.05(A*), 2.01(A+B), 2.05(C), non-FIG s4
  //      Gr3: 3.01(A*), Gr4: adds 4.104, 4.304(C)
  //      Gr5: 5.08(A), 5.308(C), Gr6: adds 6.01 A/B/C, 6.02 A, 6.104(A)
  C12: new Set([
    "1.101","1.102","1.103","1.104","1.105",
    "2.101","2.201","2.104","2.105","2.305",
    "nF-ub2-kip","nF-ub5-s4",
    "3.201",
    "4.101","4.104","4.304",
    "5.108","5.308",
    "6.101","6.102","6.104","6.201","6.301",
    "nF-ub1-LL","nF-ub1-var","nF-ub3-ov","nF-ub3-st","nF-ub6-a","nF-ub6-b",
  ]),
  // C13: adds non-FIG 30°, 1.02 A/B, 1.05 A*/A, 3.201+3.301+3.206
  //      Gr4: 4.101, 4.104, 4.304, 4.407(D)
  //      Gr5: 5.108, 5.308, Gr6: adds 6.303(C), 6.104 A/C variant
  //      Gr4 dismount: adds 6.04 C variant (4.04 → 6.104/6.204)
  C13: new Set([
    "1.101","1.102","1.103","1.104","1.105",
    "2.101","2.201","2.104","2.105","2.305","2.405",
    "nF-ub2-kip","nF-ub2-30",
    "3.201","3.301","3.206",
    "4.101","4.104","4.304","4.407",
    "5.108","5.308",
    "6.101","6.102","6.104","6.201","6.301","6.303",
    "nF-ub1-LL","nF-ub1-var","nF-ub3-ov","nF-ub3-st","nF-ub6-a","nF-ub6-b",
  ]),
  // C14-15: adds 3.01(A*/B) in gr3, gr5.07 B variant, gr5 adds 5.207
  //         Gr3.01 B, gr6: adds 6.402(D dismount)
  C1415: new Set([
    "1.101","1.102","1.103","1.104","1.105",
    "2.101","2.201","2.104","2.105","2.305","2.405",
    "nF-ub2-kip","nF-ub2-30",
    "3.201","3.301","3.206",
    "4.101","4.104","4.304","4.407",
    "5.108","5.207","5.308",
    "6.101","6.102","6.104","6.201","6.301","6.303","6.402",
    "nF-ub1-LL","nF-ub1-var","nF-ub3-ov","nF-ub3-st","nF-ub6-a","nF-ub6-b",
  ]),
  // C16+: adds 1.06(A/B) gr1, gr3.02 overvliegen voorw(C), non-FIG overvliegen gespreid rugw(B)
  //        Gr5: adds 5.409, 5.410; Gr6: adds 6.403(D)
  C16plus: new Set([
    "1.101","1.102","1.103","1.104","1.105","1.106",
    "2.101","2.201","2.104","2.105","2.305","2.405",
    "nF-ub2-kip","nF-ub2-30",
    "3.201","3.301","3.206","3.302","3.310",
    "4.101","4.104","4.304","4.205","4.407",
    "5.108","5.207","5.308","5.409","5.410",
    "6.101","6.102","6.104","6.201","6.301","6.303","6.402","6.403",
    "nF-ub1-LL","nF-ub1-var","nF-ub3-ov","nF-ub3-st","nF-ub6-a","nF-ub6-b",
  ]),
};

// BB: The C-element tables use FIG WAG CoP beam codes verified from visual inspection
const C_BB = {
  // C11: NO saltos (gr.5 empty). Gr.1 mounts, gr.2 leaps, gr.3 turns, gr.4 non-flight acro, gr.6 dismount
  C11: new Set([
    // gr.1 mounts/opstijgen
    "1.101","1.102","1.103","1.105","1.106","1.207","1.108","1.214",
    // gr.2 leaps/jumps
    "2.101","2.105","2.107","2.108","2.110","2.112","2.209","2.211",
    // gr.3 turns
    "3.101","3.208","3.304",
    // gr.4 non-flight acro
    "4.102","4.103","4.104",
    // gr.6 dismount (rondat/flik+salto types, A*/A waarden)
    "6.101","6.102",
    "nF-bb1-a","nF-bb4-a",
  ]),
  // C12: same as C11, NO saltos still, some B-values appear in leaps/turns
  C12: new Set([
    "1.101","1.102","1.103","1.105","1.106","1.207","1.108","1.214",
    "2.101","2.201","2.105","2.107","2.207","2.108","2.208","2.110","2.210","2.112","2.212","2.209","2.211","2.203","2.206",
    "3.101","3.201","3.208","3.304",
    "4.102","4.103","4.104","4.203",
    "6.101","6.102",
    "nF-bb1-a","nF-bb4-a",
  ]),
  // C13: FIRST saltos appear on balk (gr.5)
  // gr.5: 5.312(B salto bwd step out), 5.202(B flic-flac), 5.204(B flic-flac stepout), 5.206(B gainer), 5.207(B), 5.208(B rondat), 5.408(D aerial cartwheel)
  // C-tabel max = C(0.3) but uses FIG CoP codes — only codes up to the visible cells
  C13: new Set([
    "1.101","1.102","1.103","1.105","1.106","1.207","1.108","1.214","1.309","1.411",
    "2.101","2.201","2.105","2.205","2.305","2.107","2.207","2.108","2.208","2.110","2.210","2.310","2.112","2.212","2.203","2.204","2.206","2.306","2.209","2.211","2.311",
    "3.101","3.201","3.302","3.402","3.304","3.404","3.305","3.405","3.208","3.408",
    "4.102","4.103","4.203","4.104","4.204","4.105","4.107","4.108","4.208","4.109","4.209",
    "5.312","5.202","5.204","5.206","5.207","5.208","5.408",
    "6.101","6.102","6.201",
    "nF-bb1-a","nF-bb4-a",
  ]),
  // C14-15: identical to C13
  C1415: new Set([
    "1.101","1.102","1.103","1.105","1.106","1.207","1.108","1.214","1.309","1.411",
    "2.101","2.201","2.105","2.205","2.305","2.107","2.207","2.108","2.208","2.110","2.210","2.310","2.112","2.212","2.203","2.204","2.206","2.306","2.209","2.211","2.311",
    "3.101","3.201","3.302","3.402","3.304","3.404","3.305","3.405","3.208","3.408",
    "4.102","4.103","4.203","4.104","4.204","4.105","4.107","4.108","4.208","4.109","4.209",
    "5.312","5.202","5.204","5.206","5.207","5.208","5.408",
    "6.101","6.102","6.201",
    "nF-bb1-a","nF-bb4-a",
  ]),
  // C16+: adds more saltos (gr.5 rij 10=C double, rij 12=C gainer) and more dismounts
  C16plus: new Set([
    "1.101","1.102","1.103","1.104","1.105","1.106","1.207","1.108","1.214","1.309","1.411",
    "2.101","2.201","2.105","2.205","2.305","2.106","2.107","2.207","2.108","2.208","2.110","2.210","2.310","2.112","2.212","2.203","2.204","2.206","2.306","2.209","2.211","2.311",
    "3.101","3.201","3.302","3.402","3.304","3.404","3.305","3.405","3.206","3.406","3.207","3.307","3.407","3.208","3.408",
    "4.102","4.103","4.203","4.104","4.204","4.304","4.105","4.107","4.108","4.208","4.308","4.109","4.209","4.309","4.210","4.310",
    "5.312","5.202","5.204","5.206","5.207","5.208","5.408","5.410","5.510",
    "6.101","6.102","6.104","6.201","6.202","6.204","6.304",
    "nF-bb1-a","nF-bb4-a",
  ]),
};

// FX: FIG WAG CoP grond codes (groep = FX group)
// Verified from grond pages C11-C16+
// Grond groups: 1=leaps/jumps, 2=turns, 3=hand support, 4=saltos fwd/swd, 5=saltos bwd
const C_FX = {
  // C11: Gr1: 1.01(A), 1.03(A), 1.04(A), 1.05(A/B-Z), 1.06(A), 1.07(A-B), 1.08(A*), 1.09(A), 1.10(A), 1.11(A/B), 1.12(A/B), 1.13(B), 1.14(A*/A/B)
  //      Gr2 (dans): 2.01(A/B), 2.02(B), 2.03(B), 2.04(B), 2.06(B), 2.07(B)
  //      Gr3 (hand support): 3.01(A/B/C), 3.02(A), 3.03(B)  -- FX gr3
  //      Gr4 (saltos fwd): 4.01(A), 4.03(0.3 pirouette), 4.04(A), 4.05(A)  -- turns/pirouettes in FX CoP gr2/4
  //      Gr5 (saltos bwd): 5.01(A), 5.02(A/B), 5.04(A)
  // NOTE: The C-table "groep 4" = FIG FX pirouettes (turns) + some hand support
  //       The C-table "groep 5" = FIG FX saltos bwd partial
  C11: new Set([
    // Gr1 leaps/jumps
    "1.101","1.103","1.104","1.105","1.106","1.107","1.108","1.109","1.110","1.111","1.112","1.113","1.114",
    // Gr2 turns
    "2.101","2.201",
    // Gr2 dans (circle/straddle jumps in FX) → these are FX gr2.01-07 which maps to gr2 dance
    // Gr3 hand support
    "3.101","3.103","3.104","3.105","3.106","3.107",
    // Gr4 saltos fwd/swd  
    "4.101","4.103","4.104","4.105",
    // Gr5 saltos bwd
    "5.101","5.104",
    "nF-fx1-a","nF-fx3-a","nF-fx4-WAG",
  ]),
  // C12: adds 1.01(B), 1.02(B), 1.04(B), 1.06(B), 1.09(B), gr2 adds more
  C12: new Set([
    "1.101","1.103","1.104","1.105","1.106","1.107","1.108","1.109","1.110","1.111","1.112","1.113","1.114",
    "2.101","2.201",
    "3.101","3.103","3.104","3.105","3.106","3.107",
    "4.101","4.103","4.104","4.105",
    "5.101","5.104",
    "nF-fx1-a","nF-fx3-a","nF-fx4-WAG",
  ]),
  // C13: adds higher DV in all groups, saltos with twists appear
  C13: new Set([
    "1.101","1.103","1.104","1.105","1.106","1.107","1.108","1.109","1.110","1.111","1.112","1.113","1.114",
    "1.201","1.203","1.204","1.205","1.207","1.209","1.211","1.212","1.214",
    "2.101","2.201","2.202","2.203","2.205","2.206","2.207",
    "3.101","3.103","3.104","3.105","3.106","3.107","3.201","3.203",
    "4.101","4.201","4.202","4.103","4.104","4.105",
    "5.101","5.201","5.104","5.204","5.304",
    "nF-fx1-a","nF-fx3-a","nF-fx4-WAG",
  ]),
  // C14-15: identical to C13 (tables C13=C14-15)
  C1415: new Set([
    "1.101","1.103","1.104","1.105","1.106","1.107","1.108","1.109","1.110","1.111","1.112","1.113","1.114",
    "1.201","1.203","1.204","1.205","1.207","1.209","1.211","1.212","1.214",
    "2.101","2.201","2.202","2.203","2.205","2.206","2.207",
    "3.101","3.103","3.104","3.105","3.106","3.107","3.201","3.203",
    "4.101","4.201","4.202","4.103","4.104","4.105",
    "5.101","5.201","5.104","5.204","5.304",
    "nF-fx1-a","nF-fx3-a","nF-fx4-WAG",
  ]),
  // C16+: adds C/D saltos, double salto bwd, + C16-C18 max 1 acro C / C19+ geen limiet
  C16plus: new Set([
    "1.101","1.103","1.104","1.105","1.106","1.107","1.108","1.109","1.110","1.111","1.112","1.113","1.114",
    "1.201","1.203","1.204","1.205","1.207","1.209","1.211","1.212","1.214",
    "2.101","2.201","2.202","2.203","2.205","2.206","2.207",
    "3.101","3.103","3.104","3.105","3.106","3.107","3.201","3.203",
    "4.101","4.201","4.202","4.302","4.103","4.104","4.105","4.205",
    "5.101","5.201","5.301","5.401","5.402","5.104","5.204","5.304",
    "nF-fx1-a","nF-fx3-a","nF-fx4-WAG",
  ]),
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const isNonFIG = (code) => code.startsWith("nF-");

function isAllowed(levelId, apparatus, code) {
  if (levelId === "A11") return AB[apparatus]?.[code]?.A11 === 1;
  if (levelId === "B11") return AB[apparatus]?.[code]?.B11 === 1;
  if (levelId === "B12") return AB[apparatus]?.[code]?.B12 === 1;
  const map = {ub:C_UB,bb:C_BB,fx:C_FX}[apparatus];
  return map?.[levelId]?.has(code) ?? false;
}

function getElName(apparatus, code) {
  if (isNonFIG(code)) return ASTAR[apparatus]?.[code]?.n || code;
  return AB[apparatus]?.[code]?.n || code;
}

function getDV(apparatus, code) {
  if (isNonFIG(code)) return ASTAR[apparatus]?.[code]?.dv || "A*";
  return AB[apparatus]?.[code]?.dv || "?";
}

const ALL_CODES = {
  ub: [...new Set(UB_GROUPS.flatMap(g=>g.codes))],
  bb: [...new Set(BB_GROUPS.flatMap(g=>g.codes))],
  fx: [...new Set(FX_GROUPS.flatMap(g=>g.codes))],
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const DV_STYLE = {
  "A*":{bg:"#fef9c3",c:"#92400e"},
  A:{bg:"#dcfce7",c:"#14532d"},B:{bg:"#dbeafe",c:"#1e3a8a"},
  C:{bg:"#fce7f3",c:"#831843"},D:{bg:"#f3e8ff",c:"#581c87"},
  E:{bg:"#fff7ed",c:"#7c2d12"},"?":{bg:"#f1f5f9",c:"#475569"}
};

function DvBadge({dv}) {
  const s = DV_STYLE[dv] || DV_STYLE["?"];
  return <span style={{fontSize:"0.62rem",padding:"1px 5px",borderRadius:4,background:s.bg,color:s.c,fontWeight:800,whiteSpace:"nowrap",border:`1px solid ${s.c}33`}}>{dv}</span>;
}

function ElRow({code, apparatus, levelId, showAll}) {
  const allowed = isAllowed(levelId, apparatus, code);
  if (!showAll && !allowed) return null;
  const name = getElName(apparatus, code);
  const dv = getDV(apparatus, code);
  const nonFIG = isNonFIG(code);
  const isUnknown = !nonFIG && !AB[apparatus]?.[code];
  return (
    <div style={{
      display:"grid", gridTemplateColumns:"56px 32px 1fr",
      gap:6, padding:"4px 8px",
      borderBottom:"0.5px solid var(--color-border-tertiary)",
      background: nonFIG && allowed ? "#fffbeb" : allowed ? "transparent" : "#f8fafc",
      opacity: allowed ? 1 : (showAll ? 0.35 : 1),
    }}>
      <span style={{fontFamily:"monospace",fontSize:"11px",color: nonFIG ? "#92400e" : "#0369a1",paddingTop:2}}>
        {nonFIG ? "non-FIG" : code}
      </span>
      <span><DvBadge dv={dv}/></span>
      <span style={{fontSize:"12px",color: allowed ? "var(--color-text-primary)" : "var(--color-text-secondary)",lineHeight:1.4}}>
        {isUnknown ? <span style={{color:"#94a3b8",fontStyle:"italic"}}>{code}</span> : name}
      </span>
    </div>
  );
}

function GroupBlock({group, apparatus, levelId, showAll}) {
  const codes = group.codes;
  const allowedCount = codes.filter(c=>isAllowed(levelId, apparatus, c)).length;
  const visible = showAll ? codes : codes.filter(c=>isAllowed(levelId, apparatus, c));
  if (visible.length === 0) return null;
  return (
    <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,overflow:"hidden",marginBottom:8}}>
      <div style={{background:"var(--color-background-secondary)",padding:"5px 10px",display:"flex",alignItems:"center",gap:8,borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
        <span style={{background:"#0284c7",color:"#fff",borderRadius:4,fontSize:"11px",fontWeight:500,padding:"1px 6px"}}>Gr. {group.id}</span>
        <span style={{fontSize:"12px",fontWeight:500}}>{group.name}</span>
        <span style={{marginLeft:"auto",fontSize:"11px",color:"var(--color-text-secondary)"}}>FIG {group.fig}</span>
        <span style={{fontSize:"11px",background:allowedCount>0?"#dcfce7":"#f1f5f9",color:allowedCount>0?"#14532d":"#94a3b8",padding:"1px 6px",borderRadius:4,fontWeight:600}}>{allowedCount}/{codes.length}</span>
      </div>
      <div>{codes.map(c=><ElRow key={c} code={c} apparatus={apparatus} levelId={levelId} showAll={showAll}/>)}</div>
    </div>
  );
}

// ─── CR / BONUS MAPPING PER NIVEAU+TOESTEL ───────────────────────────────────
// Maps FIG codes to which CR/bonus IDs they fulfil, per level+apparatus.
// Filled in gradually — empty = no CR link known yet (shows in "Overige").
// Structure: CR_MAP[levelId][apparatus][code] = {cr:["CR1"], bonus:["B1"]}
const CR_MAP = {
  A11: {
    ub: {
      // CR1: kip + handstand gesloten
      "1.101":{cr:["CR1"]}, "1.103":{cr:["CR1"]}, "1.104":{cr:["CR1"]},
      "nF-ub1-LL":{cr:["CR1"]}, "nF-ub1-var":{cr:["CR1"]},
      // CR2: 2 cirkelelementen min 45°
      "2.101":{cr:["CR2"]}, "2.201":{cr:["CR2"]},
      "2.305":{cr:["CR2"],bonus:["B1"]},  // B1: cirkelelement min C
      "2.405":{cr:["CR2"],bonus:["B1","B2"]},
      "nF-ub2-kip":{cr:["CR2"]},
      // CR3: min reus ½
      "3.201":{cr:["CR3"],bonus:["B3"]},  // B3: voorwaarts element min B
      "3.206":{cr:["CR3"],bonus:["B3"]},
      "3.301":{cr:["CR3"],bonus:["B2"]},  // B2: 360° LA-rotatie
      // CR4: afsprong
      "6.104":{cr:["CR4"]}, "6.101":{cr:["CR4"]}, "6.102":{cr:["CR4"]},
      // non-CR overige
      "4.101":{},"4.104":{},"4.304":{},
      "5.108":{},"5.308":{},
      "4.401":{},"4.205":{},"4.407":{},
      "5.207":{},"5.409":{},"5.410":{},
    },
    bb: {
      // CR1: verbinding danselementen + pirouette
      "2.101":{cr:["CR1"]}, "1.101":{cr:["CR1"]}, "1.201":{cr:["CR1"]},
      "3.101":{cr:["CR1"]},
      // CR2: acro-verbinding tiktak + flik
      "4.104":{cr:["CR2"]}, "4.109":{cr:["CR2"]},
      "5.202":{cr:["CR2"]}, "5.204":{cr:["CR2"]},
      // CR3: 2 acro in verschillende richting
      "4.108":{cr:["CR3"]}, "5.208":{cr:["CR3"]},
      // CR4: afsprong rondat/flik + hurksalto
      "6.101":{cr:["CR4"]}, "6.102":{cr:["CR4"]},
    },
    fx: {
      // CR1: danspassage 2 sprongen + pirouette
      "1.101":{cr:["CR1"]}, "1.103":{cr:["CR1"]}, "1.107":{cr:["CR1"]},
      "2.101":{cr:["CR1"]},
      // CR2: acroserie 2 saltos + tempo-salto
      "5.101":{cr:["CR2"]}, "4.101":{cr:["CR2"]},
      // CR3: overslag gestrekte salto vw
      "3.105":{cr:["CR3"]}, "4.202":{cr:["CR3"]},
      // CR4: rondat flik schroef 360°
      "5.201":{cr:["CR4"]},
    },
  },
  B11: {
    ub: {
      "1.101":{cr:["CR1"]}, "nF-ub1-LL":{cr:["CR1"]}, "nF-ub1-var":{cr:["CR1"]},
      "2.101":{cr:["CR2"],bonus:["B2"]}, "2.201":{cr:["CR2"],bonus:["B2"]},
      "nF-ub2-kip":{cr:["CR3"]}, "5.108":{cr:["CR3"]},
      "3.201":{cr:["CR4"],bonus:["B3"]}, "3.206":{cr:["CR4"],bonus:["B3"]},
      "6.104":{cr:["CR4"],"bonus":["B4"]}, "6.101":{cr:["CR4"],"bonus":["B4"]},
    },
    bb:{}, fx:{},
  },
  B12: {
    ub: {
      "1.101":{cr:["CR1"],bonus:["B1"]},
      "2.101":{cr:["CR2"]}, "2.201":{cr:["CR2"]}, "2.305":{cr:["CR2"],bonus:["B1"]},
      "3.201":{cr:["CR3"]}, "3.206":{cr:["CR3"]},
      "6.104":{cr:["CR4"]}, "6.101":{cr:["CR4"]}, "6.102":{cr:["CR4"]},
    },
    bb:{}, fx:{},
  },
};

function getCRLinks(levelId, apparatus, code) {
  return CR_MAP[levelId]?.[apparatus]?.[code] || {};
}

// ─── GITHUB SYMBOL URL ────────────────────────────────────────────────────────
// Once symbols are extracted and pushed to GitHub, update this base URL.
// Expected structure: /symbols/{apparatus}/{code}.png and /figures/{apparatus}/{code}.png
const GITHUB_BASE = "https://raw.githubusercontent.com/OTV-Nazareth/elementtabellen/main";
function symUrl(apparatus, code) { return `${GITHUB_BASE}/symbols/${apparatus}/${code}.png`; }
function figUrl(apparatus, code) { return `${GITHUB_BASE}/figures/${apparatus}/${code}.png`; }

// ─── ELEMENT CARD (B+ style) ─────────────────────────────────────────────────
function ElCard({code, apparatus, levelId, crLinks, showSym}) {
  const allowed = isAllowed(levelId, apparatus, code);
  const name = getElName(apparatus, code);
  const dv = getDV(apparatus, code);
  const nonFIG = isNonFIG(code);
  const dvVal = {"A*":0.1,A:0.1,B:0.2,C:0.3,D:0.4,E:0.5}[dv] || 0;
  const dvColor = {"A*":"#92400e",A:"#14532d",B:"#1e3a8a",C:"#831843",D:"#581c87",E:"#7c2d12"}[dv]||"#475569";
  const dvBg   = {"A*":"#fef9c3",A:"#dcfce7",B:"#dbeafe",C:"#fce7f3",D:"#f3e8ff",E:"#fff7ed"}[dv]||"#f1f5f9";
  const [imgErr, setImgErr] = useState(false);
  const [figErr, setFigErr] = useState(false);

  return (
    <div style={{
      display:"grid", gridTemplateColumns: showSym ? "52px 1fr" : "1fr",
      gap:8, padding:"7px 8px",
      border:"0.5px solid var(--color-border-tertiary)",
      borderRadius:"var(--border-radius-md)",
      background: allowed ? "var(--color-background-primary)" : "var(--color-background-secondary)",
      opacity: allowed ? 1 : 0.45,
    }}>
      {showSym && (
        <div style={{display:"flex",flexDirection:"column",gap:3,alignItems:"center"}}>
          {/* Symbol placeholder / image */}
          <div style={{width:48,height:34,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:3,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
            {!imgErr
              ? <img src={symUrl(apparatus,code)} onError={()=>setImgErr(true)} style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}} alt="symbool"/>
              : <span style={{fontSize:"8px",color:"var(--color-text-secondary)",fontFamily:"serif",textAlign:"center",padding:2}}>{nonFIG?"non\nFIG":code.split(".")[0]+"."}</span>
            }
          </div>
          {/* Figure placeholder / image */}
          <div style={{width:48,height:34,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:3,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
            {!figErr
              ? <img src={figUrl(apparatus,code)} onError={()=>setFigErr(true)} style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}} alt="figuur"/>
              : <span style={{fontSize:"7px",color:"var(--color-text-secondary)",textAlign:"center",lineHeight:1.2,padding:2}}>figuur\nbeschikbaar\nna GitHub</span>
            }
          </div>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:3,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
          <span style={{fontFamily:"monospace",fontSize:"10px",color: nonFIG?"#92400e":"#0369a1"}}>{nonFIG?"non-FIG":code}</span>
          <span style={{fontSize:"9px",fontWeight:700,padding:"1px 5px",borderRadius:3,background:dvBg,color:dvColor}}>{dv}</span>
          <span style={{fontSize:"9px",fontWeight:700,color:dvColor}}>+{dvVal.toFixed(1)}</span>
        </div>
        <div style={{fontSize:"11px",lineHeight:1.4,color:"var(--color-text-primary)",wordBreak:"break-word"}}>{name}</div>
        {(crLinks.cr?.length > 0 || crLinks.bonus?.length > 0) && (
          <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
            {crLinks.cr?.map(c=>(
              <span key={c} style={{fontSize:"9px",background:"#ede9fe",color:"#6d28d9",padding:"1px 5px",borderRadius:3,fontWeight:500}}>{c}</span>
            ))}
            {crLinks.bonus?.map(b=>(
              <span key={b} style={{fontSize:"9px",background:"#fdf4ff",color:"#9333ea",padding:"1px 5px",borderRadius:3}}>{b}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SPLIT VIEW (B+) ──────────────────────────────────────────────────────────
function SplitView({apparatus, levelId, level, showAll}) {
  const appKey = {ub:"ub",bb:"bb",fx:"fx"}[apparatus] || apparatus;
  const progKey = {A11:"A11",A12:"A12",A13:"A13",B11:"B11",B12:"B12",B13:"B13",B1415:"B1415"}[levelId];
  const prog = PROG[progKey]?.[apparatus==="ub"?"Brug ongelijk":apparatus==="bb"?"Balk":"Grond"];
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [showSym, setShowSym] = useState(false);

  // Build filter items: ALL, each CR, each bonus, OVERIGE
  const crItems  = prog?.cr    || [];
  const bonItems = prog?.bonus || [];

  // Get all allowed codes for this apparatus/level
  const groups = {ub:UB_GROUPS,bb:BB_GROUPS,fx:FX_GROUPS}[appKey]||[];
  const allCodes = groups.flatMap(g=>g.codes);
  const visibleCodes = showAll
    ? allCodes
    : allCodes.filter(c=>isAllowed(levelId,appKey,c));

  // For each code, get its CR links
  const codesWithLinks = visibleCodes.map(code => ({
    code,
    links: getCRLinks(levelId, appKey, code),
  }));

  // Filter codes based on selected filter
  const filtered = codesWithLinks.filter(({code, links}) => {
    if (selectedFilter === "ALL") return true;
    if (selectedFilter === "OVERIGE") {
      return (!links.cr || links.cr.length === 0) && (!links.bonus || links.bonus.length === 0);
    }
    return links.cr?.includes(selectedFilter) || links.bonus?.includes(selectedFilter);
  });

  const crColor = "#6d28d9";
  const bonColor = "#9333ea";

  return (
    <div style={{display:"flex",gap:0,minHeight:400,border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden"}}>

      {/* ── LEFT PANEL ── */}
      <div style={{width:190,flexShrink:0,borderRight:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-secondary)",display:"flex",flexDirection:"column"}}>

        {/* ALL button */}
        <div
          onClick={()=>setSelectedFilter("ALL")}
          style={{padding:"8px 10px",borderBottom:"0.5px solid var(--color-border-tertiary)",cursor:"pointer",
            borderLeft:`3px solid ${selectedFilter==="ALL"?level.color:"transparent"}`,
            background: selectedFilter==="ALL" ? level.bg : "transparent",
          }}>
          <div style={{fontSize:"11px",fontWeight:500,color:selectedFilter==="ALL"?level.color:"var(--color-text-secondary)"}}>
            Alle elementen
          </div>
          <div style={{fontSize:"10px",color:"var(--color-text-secondary)"}}>
            {visibleCodes.length} toegelaten
          </div>
        </div>

        {/* CR items */}
        {crItems.length > 0 && (
          <>
            <div style={{padding:"4px 10px",fontSize:"9px",fontWeight:500,textTransform:"uppercase",letterSpacing:"0.07em",color:"var(--color-text-secondary)",background:"var(--color-background-tertiary,var(--color-background-secondary))",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
              Vereisten (CR's)
            </div>
            {crItems.map(cr=>{
              const count = codesWithLinks.filter(({links})=>links.cr?.includes(cr.id)).length;
              const on = selectedFilter===cr.id;
              return (
                <div key={cr.id} onClick={()=>setSelectedFilter(on?"ALL":cr.id)}
                  style={{padding:"7px 10px",borderBottom:"0.5px solid var(--color-border-tertiary)",cursor:"pointer",
                    borderLeft:`3px solid ${on?crColor:"transparent"}`,
                    background: on?"#ede9fe":"transparent",
                  }}>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                    <span style={{fontFamily:"monospace",fontSize:"11px",fontWeight:500,color:crColor}}>{cr.id}</span>
                    <span style={{marginLeft:"auto",fontSize:"10px",fontWeight:700,color:crColor}}>+{cr.val}</span>
                    <span style={{fontSize:"9px",background:count>0?"#ede9fe":"#f1f5f9",color:count>0?crColor:"#94a3b8",padding:"0 4px",borderRadius:3}}>{count}</span>
                  </div>
                  <div style={{fontSize:"10px",color:"var(--color-text-secondary)",lineHeight:1.3}}>{cr.desc}</div>
                </div>
              );
            })}
          </>
        )}

        {/* Bonus items */}
        {bonItems.length > 0 && (
          <>
            <div style={{padding:"4px 10px",fontSize:"9px",fontWeight:500,textTransform:"uppercase",letterSpacing:"0.07em",color:"var(--color-text-secondary)",background:"var(--color-background-tertiary,var(--color-background-secondary))",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
              Bonificaties
            </div>
            {bonItems.map(b=>{
              const count = codesWithLinks.filter(({links})=>links.bonus?.includes(b.id)).length;
              const on = selectedFilter===b.id;
              return (
                <div key={b.id} onClick={()=>setSelectedFilter(on?"ALL":b.id)}
                  style={{padding:"7px 10px",borderBottom:"0.5px solid var(--color-border-tertiary)",cursor:"pointer",
                    borderLeft:`3px solid ${on?bonColor:"transparent"}`,
                    background: on?"#fdf4ff":"transparent",
                  }}>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                    <span style={{fontFamily:"monospace",fontSize:"11px",fontWeight:500,color:bonColor}}>{b.id}</span>
                    <span style={{marginLeft:"auto",fontSize:"10px",fontWeight:700,color:bonColor}}>+{b.val}</span>
                    <span style={{fontSize:"9px",background:count>0?"#fdf4ff":"#f1f5f9",color:count>0?bonColor:"#94a3b8",padding:"0 4px",borderRadius:3}}>{count}</span>
                  </div>
                  <div style={{fontSize:"10px",color:"var(--color-text-secondary)",lineHeight:1.3}}>{b.desc}</div>
                </div>
              );
            })}
          </>
        )}

        {/* Overige */}
        {(() => {
          const overige = codesWithLinks.filter(({links})=>(!links.cr||links.cr.length===0)&&(!links.bonus||links.bonus.length===0));
          const on = selectedFilter==="OVERIGE";
          return (
            <>
              <div style={{padding:"4px 10px",fontSize:"9px",fontWeight:500,textTransform:"uppercase",letterSpacing:"0.07em",color:"var(--color-text-secondary)",background:"var(--color-background-tertiary,var(--color-background-secondary))",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
                Overige
              </div>
              <div onClick={()=>setSelectedFilter(on?"ALL":"OVERIGE")}
                style={{padding:"7px 10px",borderBottom:"0.5px solid var(--color-border-tertiary)",cursor:"pointer",
                  borderLeft:`3px solid ${on?"#64748b":"transparent"}`,
                  background: on?"#f1f5f9":"transparent",
                }}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                  <span style={{fontFamily:"monospace",fontSize:"11px",fontWeight:500,color:"#64748b"}}>—</span>
                  <span style={{marginLeft:"auto",fontSize:"9px",background:overige.length>0?"#f1f5f9":"#f1f5f9",color:"#64748b",padding:"0 4px",borderRadius:3}}>{overige.length}</span>
                </div>
                <div style={{fontSize:"10px",color:"var(--color-text-secondary)",lineHeight:1.3}}>Elementen zonder CR/bonus link</div>
              </div>
            </>
          );
        })()}

        {/* Sym toggle */}
        <div style={{marginTop:"auto",padding:"8px 10px",borderTop:"0.5px solid var(--color-border-tertiary)"}}>
          <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:"11px",color:"var(--color-text-secondary)"}}>
            <input type="checkbox" checked={showSym} onChange={e=>setShowSym(e.target.checked)} style={{width:13,height:13}}/>
            Toon symbolen
          </label>
          <div style={{fontSize:"9px",color:"var(--color-text-secondary)",marginTop:3,lineHeight:1.3}}>
            Symbolen laden via GitHub na extractie
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{flex:1,padding:"10px",overflowY:"auto",maxHeight:520}}>
        {/* Panel header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontSize:"10px",fontWeight:500,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--color-text-secondary)"}}>
            {selectedFilter==="ALL" ? "Alle toegelaten elementen" :
             selectedFilter==="OVERIGE" ? "Overige elementen (geen CR/bonus link)" :
             `${selectedFilter} — ${[...crItems,...bonItems].find(x=>x.id===selectedFilter)?.desc||""}`}
          </div>
          <span style={{fontSize:"10px",color:"var(--color-text-secondary)"}}>{filtered.length} element{filtered.length!==1?"en":""}</span>
        </div>

        {/* No prog warning for C-levels */}
        {!prog && (
          <div style={{fontSize:"11px",color:"var(--color-text-secondary)",background:"var(--color-background-secondary)",padding:"8px 10px",borderRadius:"var(--border-radius-md)",marginBottom:8,border:"0.5px solid var(--color-border-tertiary)"}}>
            ℹ️ CR-koppelingen nog niet ingevuld voor dit niveau. Elementen staan in "Overige".
          </div>
        )}

        {/* Cards */}
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {filtered.length === 0 && (
            <div style={{padding:16,textAlign:"center",color:"var(--color-text-secondary)",fontSize:"12px"}}>
              Geen elementen gevonden.
            </div>
          )}
          {filtered.map(({code,links})=>(
            <ElCard key={code} code={code} apparatus={appKey} levelId={levelId} crLinks={links} showSym={showSym}/>
          ))}
        </div>
      </div>
    </div>
  );
}
function CRRow({item, color}) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"52px 1fr 38px",gap:6,padding:"5px 10px",borderBottom:"0.5px solid var(--color-border-tertiary)",alignItems:"start"}}>
      <span style={{fontFamily:"var(--font-mono)",fontSize:"11px",fontWeight:600,color:color||"#0369a1",paddingTop:1}}>{item.id}</span>
      <span style={{fontSize:"12px",lineHeight:1.4,color:"var(--color-text-primary)"}}>{item.desc}</span>
      <span style={{fontSize:"12px",fontWeight:700,color:color||"#0369a1",textAlign:"right"}}>+{item.val}</span>
    </div>
  );
}

function ProgrammaSection({prog, apparatus, level}) {
  const appProg = prog?.[apparatus];
  if (!appProg) return <div style={{fontSize:"12px",color:"var(--color-text-secondary)",padding:8}}>Geen specifiek Belgisch programma — zie FIG CoP 2025-2028.</div>;

  if (apparatus === "Sprong") {
    return (
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        {appProg.info.map((row,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"160px 1fr",gap:8,padding:"5px 10px",background:i%2===0?"var(--color-background-secondary)":"transparent",borderRadius:6,fontSize:"12px"}}>
            <span style={{fontWeight:500,color:"var(--color-text-secondary)"}}>{row.k}</span>
            <span>{row.v}</span>
          </div>
        ))}
      </div>
    );
  }

  const crColor = "#0369a1";
  const bonColor = "#7c3aed";
  const minCR = appProg.min_cr_bonus;

  return (
    <div>
      {/* CR block */}
      <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,overflow:"hidden",marginBottom:8}}>
        <div style={{background:"#eff6ff",padding:"5px 10px",borderBottom:"0.5px solid var(--color-border-tertiary)",display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:"11px",fontWeight:700,color:"#1e40af",textTransform:"uppercase",letterSpacing:"0.06em"}}>Vereisten (CR's)</span>
          <span style={{fontSize:"11px",color:"#1e40af",marginLeft:"auto"}}>max. 4 × 0.5 = 2.00 ptn</span>
        </div>
        {appProg.cr.map(cr=><CRRow key={cr.id} item={cr} color={crColor}/>)}
      </div>

      {/* Bonus block */}
      {appProg.bonus && appProg.bonus.length > 0 && (
        <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,overflow:"hidden",marginBottom:8}}>
          <div style={{background:"#f5f3ff",padding:"5px 10px",borderBottom:"0.5px solid var(--color-border-tertiary)",display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:"11px",fontWeight:700,color:bonColor,textTransform:"uppercase",letterSpacing:"0.06em"}}>Bonificaties</span>
            {minCR > 0 && <span style={{fontSize:"11px",color:bonColor,background:"#ede9fe",padding:"1px 6px",borderRadius:4}}>indien min. {minCR} CR's geteld</span>}
          </div>
          {appProg.bonus.map(b=><CRRow key={b.id} item={b} color={bonColor}/>)}
        </div>
      )}

      {/* Notes */}
      {appProg.notes && appProg.notes.length > 0 && (
        <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:"8px 12px"}}>
          <div style={{fontSize:"10px",fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Opmerkingen</div>
          {appProg.notes.map((n,i)=>(
            <div key={i} style={{fontSize:"11px",color:"var(--color-text-secondary)",lineHeight:1.5,paddingLeft:8}}>• {n}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgrammaTab({levelId, level}) {
  const [subLevel, setSubLevel] = useState(null);
  const [apparat, setApparat] = useState("Brug ongelijk");

  // Determine which prog key(s) apply
  const isA1213 = levelId === "A11" ? false : false; // A12/A13 handled via subLevel
  const hasSubLevels = levelId === "A11"; // A11 always single; A12/A13 would come from doc but we show both

  // For A-niveau we show A11 direct; for B we show the right key
  // Also handle A12/A13 as a special selector when we add those levels later
  const progKeys = {
    A11:"A11", B11:"B11", B12:"B12", B13:"B13", B1415:"B1415",
  };
  const progKey = subLevel || progKeys[levelId];
  const prog = PROG[progKey];

  // A12/A13 sub-selector (shown when the A12 or A13 level is active — not yet in LEVELS but future-proof)
  const showA1213 = !prog && (levelId === "A11");

  if (!prog) {
    return (
      <div style={{padding:"12px",background:"var(--color-background-secondary)",borderRadius:8,fontSize:"12px",color:"var(--color-text-secondary)"}}>
        Programma voor dit niveau volgt nog (C-programma binnenkort).
      </div>
    );
  }

  const appOptions = ["Sprong","Brug ongelijk","Balk","Grond"];

  return (
    <div>
      {/* General info */}
      <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:"10px 12px",marginBottom:10}}>
        <div style={{fontSize:"10px",fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Algemeen</div>
        {[
          ["D-score", prog.general.dscore],
          ["CR's", prog.general.cr_max],
          ["Bonificaties", prog.general.bonus_cond],
          ["Tijdsduur balk", prog.general.beam_time],
        ].map(([k,v])=>(
          <div key={k} style={{display:"grid",gridTemplateColumns:"110px 1fr",gap:6,marginBottom:3,fontSize:"11px"}}>
            <span style={{fontWeight:500,color:"var(--color-text-secondary)"}}>{k}</span>
            <span style={{color:"var(--color-text-primary)"}}>{v}</span>
          </div>
        ))}
        {/* Short exercise */}
        {prog.general.short_ex && (
          <div style={{marginTop:6}}>
            <div style={{fontSize:"10px",fontWeight:600,color:"var(--color-text-secondary)",marginBottom:4}}>Te korte oefening</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {prog.general.short_ex.map((s,i)=>(
                <div key={i} style={{background:"#fff",border:"0.5px solid var(--color-border-tertiary)",borderRadius:5,padding:"2px 8px",fontSize:"11px"}}>
                  <strong>{s.pen} ptn</strong> — {s.els} elementen
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Apparatus selector */}
      <div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>
        {appOptions.map(a=>(
          <button key={a} onClick={()=>setApparat(a)} style={{
            padding:"5px 10px",border:"0.5px solid",fontSize:"11px",
            borderColor:apparat===a?level.color:"var(--color-border-tertiary)",
            borderRadius:6,background:apparat===a?level.bg:"var(--color-background-primary)",
            color:apparat===a?level.color:"var(--color-text-secondary)",
            cursor:"pointer",fontFamily:"var(--font-sans)",
          }}>{ICONS[a]} {a}</button>
        ))}
      </div>

      <ProgrammaSection prog={prog} apparatus={apparat} level={level}/>
    </div>
  );
}

function VaultSection({levelId}) {
  if (levelId==="C11") return (
    <div>
      <div style={{background:"#fef9c3",border:"1px solid #fde68a",borderRadius:8,padding:"10px 14px",marginBottom:12,fontSize:"0.8rem",color:"#713f12"}}>
        <strong>C11 – Opgelegd programma</strong>
      </div>
      {[{label:"Sprong 1 (verplicht)",n:"Overslag tot stand",detail:"Verhoog: 100 cm"},{label:"Sprong 2 (verplicht)",n:"Streksalto tot stand",detail:"Mattenberg: 50 cm"}].map((v,i)=>(
        <div key={i} style={{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,padding:"10px 14px",marginBottom:8,display:"flex",gap:12,alignItems:"center"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:"0.68rem",color:"var(--color-text-secondary)"}}>{v.label}</div>
            <div style={{fontSize:"0.9rem",fontWeight:500}}>{v.n}</div>
            <div style={{fontSize:"0.7rem",color:"var(--color-text-secondary)"}}>{v.detail}</div>
          </div>
          <div style={{background:"#e0f2fe",borderRadius:6,padding:"4px 10px",fontSize:"0.75rem",fontWeight:800,color:"#0c4a6e"}}>Vast</div>
        </div>
      ))}
    </div>
  );
  if (["A11","B11","B12"].includes(levelId)) return (
    <div style={{background:"#eff6ff",border:"1px solid #93c5fd",borderRadius:8,padding:"12px 16px",fontSize:"0.8rem",color:"#1e40af"}}>
      {levelId==="A11" && <><strong>A11</strong> — Belgisch programma 2025-2028. Sprong 1: keuze (overslag / groep III / groep IV). Sprong 2: Yurchenko-voorbereiding of overslag met val. Gemiddelde van 2 sprongen. Materiaal: Pegasus 1m25.</>}
      {levelId==="B11" && <><strong>B11</strong> — Enkel overslag toegestaan. FIG-code 1.00: Handspring fwd.</>}
      {levelId==="B12" && <><strong>B12</strong> — Vrije keuze uit alle sprongen (volledige FIG CoP 2025-2028).</>}
    </div>
  );
  const groups = {
    C12:[{name:"FIG Groep I",vaults:VAULTS.C12}],
    C13:[{name:"FIG Groep I",vaults:VAULTS.C13}],
    C1415:[{name:"FIG Groep I",vaults:VAULTS.C1415}],
    C16plus:[{name:"FIG Groep I",vaults:VAULTS.C16plus_I},{name:"FIG Groep III",vaults:VAULTS.C16plus_III},{name:"FIG Groep IV",vaults:VAULTS.C16plus_IV}],
  }[levelId]||[];
  return <div>{groups.map(g=>(
    <div key={g.name} style={{marginBottom:14}}>
      <div style={{fontSize:"0.7rem",fontWeight:700,color:"#0369a1",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{g.name}</div>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        {g.vaults.map((v,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:7,padding:"6px 12px"}}>
            <span style={{fontFamily:"monospace",fontWeight:700,color:"#0369a1",fontSize:"0.75rem",minWidth:36}}>{v.nr}</span>
            <span style={{flex:1,fontSize:"0.75rem",color:"var(--color-text-primary)"}}>{VAULT_NAMES[v.nr]||v.nr}</span>
            <span style={{fontWeight:800,fontSize:"0.9rem",color:"#0c4a6e",background:"#e0f2fe",padding:"2px 8px",borderRadius:5}}>{v.d.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  ))}</div>;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [levelId, setLevelId] = useState("A11");
  const [apparatus, setApparatus] = useState("Programma");
  const [showAll, setShowAll] = useState(false);
  const level = LEVELS.find(l=>l.id===levelId);
  const isAB = ["A11","A12","A13","B11","B12","B13","B1415"].includes(levelId);
  const appKey = {Sprong:null,"Brug ongelijk":"ub",Balk:"bb",Grond:"fx",Programma:null}[apparatus];
  const groups = {ub:UB_GROUPS,bb:BB_GROUPS,fx:FX_GROUPS}[appKey]||[];

  const totalAllowed = useMemo(()=>{
    if (!appKey) return 0;
    return ALL_CODES[appKey].filter(c=>isAllowed(levelId,appKey,c)).length;
  },[levelId,appKey]);

  return (
    <div style={{fontFamily:"var(--font-sans)",fontSize:13,color:"var(--color-text-primary)",minHeight:"100vh"}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#0c4a6e 0%,#0369a1 60%,#0ea5e9 100%)",padding:"16px 16px 12px",color:"#fff"}}>
        <div style={{fontSize:"0.62rem",letterSpacing:"0.12em",textTransform:"uppercase",opacity:0.7,marginBottom:3}}>FRBG · WAG CoP 2025-2028</div>
        <div style={{fontSize:"1.15rem",fontWeight:500,marginBottom:2}}>Elementtabellen GAF</div>
        <div style={{fontSize:"0.68rem",opacity:0.75}}>Belgisch wedstrijdprogramma A / B / C — versie mei 2026</div>
      </div>

      {/* Level tabs */}
      <div style={{background:"var(--color-background-primary)",borderBottom:"0.5px solid var(--color-border-tertiary)",overflowX:"auto"}}>
        <div style={{display:"flex",minWidth:"max-content"}}>
          {LEVELS.map(l=>(
            <button key={l.id} onClick={()=>{setLevelId(l.id);setApparatus("Programma");setShowAll(false);}} style={{
              padding:"8px 13px",border:"none",background:"none",cursor:"pointer",
              fontSize:"0.73rem",fontWeight:levelId===l.id?500:400,
              color:levelId===l.id?l.color:"var(--color-text-secondary)",
              borderBottom:`2px solid ${levelId===l.id?l.color:"transparent"}`,
              whiteSpace:"nowrap",fontFamily:"var(--font-sans)",
            }}>{l.label}</button>
          ))}
        </div>
      </div>

      {/* Apparatus tabs */}
      <div style={{padding:"10px 12px 0",display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        {APPS.map(app=>(
          <button key={app} onClick={()=>setApparatus(app)} style={{
            padding:"6px 12px",border:"0.5px solid",
            borderColor:apparatus===app?level.color:"var(--color-border-tertiary)",
            borderRadius:7,background:apparatus===app?level.bg:"var(--color-background-primary)",
            color:apparatus===app?level.color:"var(--color-text-secondary)",
            fontSize:"0.77rem",fontWeight:apparatus===app?500:400,
            cursor:"pointer",fontFamily:"var(--font-sans)",
            display:"flex",alignItems:"center",gap:5,
          }}>
            <span>{ICONS[app]}</span><span>{app}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{padding:"10px 12px 24px"}}>
        <div style={{background:"var(--color-background-primary)",borderRadius:10,border:"0.5px solid var(--color-border-tertiary)",padding:"14px"}}>
          <div style={{fontSize:"0.82rem",fontWeight:500,marginBottom:12,display:"flex",alignItems:"center",gap:7,color:"var(--color-text-primary)"}}>
            <span>{ICONS[apparatus]}</span>{apparatus} — {level.label}
            {isAB && apparatus!=="Sprong" && (
              <span style={{fontSize:"0.65rem",background:"#fef9c3",color:"#92400e",padding:"1px 7px",borderRadius:4,marginLeft:4}}>
                Belgisch programma — gele elementen
              </span>
            )}
          </div>

          {apparatus==="Programma" && <ProgrammaTab levelId={levelId} level={level}/>}
          {apparatus==="Sprong" && <VaultSection levelId={levelId}/>}

          {appKey && (
            <SplitView
              apparatus={appKey}
              levelId={levelId}
              level={level}
              showAll={showAll}
            />
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{margin:"0 12px 20px",background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:8,padding:"8px 12px"}}>
        <div style={{fontSize:"0.62rem",fontWeight:500,color:"var(--color-text-secondary)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Legende</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          {[["A*","0.1 (non-FIG)"],["A","0.1"],["B","0.2"],["C","0.3"],["D","0.4"],["E","0.5"]].map(([dv,val])=>(
            <div key={dv} style={{display:"flex",alignItems:"center",gap:3}}>
              <DvBadge dv={dv}/><span style={{fontSize:"0.68rem",color:"var(--color-text-secondary)"}}>{val} pt</span>
            </div>
          ))}
          <span style={{fontSize:"0.65rem",color:"#92400e",marginLeft:4}}>
            🟡 Oranje code = non-FIG Belgisch element (A* = 0.1, enkel in C-programma)
          </span>
        </div>
      </div>
    </div>
  );
}
