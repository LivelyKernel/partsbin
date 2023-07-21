import { ShadowObject, ViewModel, component, Ellipse } from 'lively.morphic';
import { Color } from 'lively.graphics/color.js';
import { pt } from 'lively.graphics/geometry-2d.js';
import { num } from 'lively.lang';

class ClockModel extends ViewModel {
  static get properties () {
    return {
      expose: { get () { return ['update']; } }
    };
  }

  bounceEasing (t, b, c, d) {
    var s = 1.70158; let p = 0; let a = c;
    if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
    if (a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  }

  viewDidLoad () {
    this.update(false);
    this.view.startStepping(1000, 'update');
  }

  update () {
    const animated = true;
    let d = new Date();
    let sec = d.getSeconds();
    let min = d.getMinutes();
    let h = (d.getHours() % 12) + (min / 60);
    this.setHour(h);
    this.setMinute(min, animated);
    this.setSecond(sec, animated);
  }

  setHour (h) {
    // steps are so small, no animation is needed
    this.ui.hourHand.rotation = Math.PI + Math.PI * 2 * (h / 12);
  }

  setSecond (sec, animated = true) {
    let duration = 1000; let easing = (t) => t;
    let outQuad = (t, b, c, d) => {
  		return c * ((t = t / d - 1) * t * t + 1) + b;
  	};
    if (sec > 50) return;
    if (sec == 50) {
      duration = 8000;
      easing = t => {
        if (t < .7) { return t / 0.9; }
        // add an inverted root function
        return outQuad(t - .7, (0.7 / 0.9), (1 - (0.7 / 0.9)), .3);
      };
      sec = 60;
    }
    let endRot = Math.PI + Math.PI * 2 * (sec / 60);
    let hand = this.ui.secondHand;
    let currRot = hand.rotation;
    if (!animated) {
      hand.rotation = endRot;
      return;
    }
    if (endRot < currRot) {
      hand.rotation %= Math.PI * 2;
      return;
    }
    hand.animate({
      duration,
      customTween: (p) => {
        hand.rotation = num.interpolate(p, currRot, endRot, 1);
      },
      easing
    });
  }

  setMinute (min, animated = true) {
    let endRot = Math.PI + Math.PI * 2 * (min / 60);
    let hand = this.ui.minuteHand;
    let currRot = hand.rotation;
    if (currRot == endRot) return;
    if (!animated) {
      hand.rotation = endRot;
      return;
    }
    hand.animate({
      customTween: (p) => {
        hand.rotation = this.bounceEasing(p, currRot, endRot - currRot, 1);
      },
      easing: (t) => t
    });
  }
}

const Clock = component({
  type: Ellipse,
  defaultViewModel: ClockModel,
  borderColor: Color.rgb(123, 125, 125),
  borderWidth: 2,
  clipMode: 'hidden',
  draggable: true,
  extent: pt(310.1, 310.1),
  grabbable: true,
  isEllipse: true,
  position: pt(813.5, 348.8),
  submorphs: [{
    name: 'minute hand',
    borderColor: Color.rgb(123, 125, 125),
    draggable: true,
    dropShadow: new ShadowObject({ distance: 0, color: Color.rgba(0, 0, 0, 0.36), blur: 9 }),
    extent: pt(10.4, 175.2),
    fill: Color.rgb(0, 0, 0),
    grabbable: true,
    origin: pt(5.1, 30.6),
    position: pt(155, 155),
    rotation: 9.320058205649719
  }, {
    name: 'minute 1',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(5, 156.5),
    position: pt(155, 152.6),
    rotation: 3.141592653589793
  }, {
    name: 'minute 2',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(156.1, 155.1),
    rotation: 3.246312408709453
  }, {
    name: 'minute 3',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(156.1, 155.3),
    rotation: 3.3510321638291125
  }, {
    name: 'minute 4',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(156, 155.4),
    rotation: 3.4557519189487724
  }, {
    name: 'minute 5',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(156, 155.5),
    rotation: 3.5604716740684323
  }, {
    name: 'minute 6',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(295.3, -86.2),
    rotation: 3.665191429188092
  }, {
    name: 'minute 7',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.9, 155.7),
    rotation: 3.7699111843077517
  }, {
    name: 'minute 8',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.8, 155.7),
    rotation: 3.8746309394274117
  }, {
    name: 'minute 9',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.7, 155.8),
    rotation: 3.979350694547071
  }, {
    name: 'minute 10',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.7, 155.9),
    rotation: 4.084070449666731
  }, {
    name: 'minute 11',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(397.1, 16.2),
    rotation: 4.1887902047863905
  }, {
    name: 'minute 12',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.5, 156),
    rotation: 4.29350995990605
  }, {
    name: 'minute 13',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.4, 156),
    rotation: 4.39822971502571
  }, {
    name: 'minute 14',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.3, 156.1),
    rotation: 4.502949470145371
  }, {
    name: 'minute 15',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.1, 156.1),
    rotation: 4.60766922526503
  }, {
    name: 'minute 16',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(434.1, 155.8),
    rotation: 4.71238898038469
  }, {
    name: 'minute 17',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.9, 156.1),
    rotation: 4.817108735504349
  }, {
    name: 'minute 18',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.8, 156.1),
    rotation: 4.921828490624009
  }, {
    name: 'minute 19',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.7, 156),
    rotation: 5.026548245743669
  }, {
    name: 'minute 20',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.6, 156),
    rotation: 5.1312680008633285
  }, {
    name: 'minute 21',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(396.3, 295.3),
    rotation: 5.235987755982988
  }, {
    name: 'minute 22',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.4, 155.9),
    rotation: 5.340707511102648
  }, {
    name: 'minute 23',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.3, 155.8),
    rotation: 5.445427266222308
  }, {
    name: 'minute 24',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.3, 155.7),
    rotation: 5.550147021341968
  }, {
    name: 'minute 25',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.2, 155.7),
    rotation: 5.654866776461628
  }, {
    name: 'minute 26',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(293.9, 397.1),
    rotation: 5.759586531581288
  }, {
    name: 'minute 27',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.1, 155.5),
    rotation: 5.8643062867009474
  }, {
    name: 'minute 28',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154, 155.4),
    rotation: 5.969026041820607
  }, {
    name: 'minute 29',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154, 155.3),
    rotation: 6.073745796940267
  }, {
    name: 'minute 30',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154, 155.1),
    rotation: 6.178465552059926
  }, {
    name: 'minute 31',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(154.2, 434.1),
    rotation: 6.283185307179586
  }, {
    name: 'minute 32',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154, 154.9),
    rotation: 6.387905062299247
  }, {
    name: 'minute 33',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154, 154.8),
    rotation: 6.492624817418905
  }, {
    name: 'minute 34',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154, 154.7),
    rotation: 6.5973445725385655
  }, {
    name: 'minute 35',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.1, 154.6),
    rotation: 6.702064327658225
  }, {
    name: 'minute 36',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(14.8, 396.3),
    rotation: 6.806784082777885
  }, {
    name: 'minute 37',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.2, 154.4),
    rotation: 6.911503837897545
  }, {
    name: 'minute 38',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.3, 154.3),
    rotation: 7.016223593017205
  }, {
    name: 'minute 39',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.3, 154.3),
    rotation: 7.120943348136864
  }, {
    name: 'minute 40',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.4, 154.2),
    rotation: 7.225663103256524
  }, {
    name: 'minute 41',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(-87, 293.9),
    rotation: 7.330382858376184
  }, {
    name: 'minute 42',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.6, 154.1),
    rotation: 7.435102613495844
  }, {
    name: 'minute 43',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.7, 154),
    rotation: 7.5398223686155035
  }, {
    name: 'minute 44',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.8, 154),
    rotation: 7.644542123735163
  }, {
    name: 'minute 45',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(154.9, 154),
    rotation: 7.749261878854822
  }, {
    name: 'minute 46',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(-124, 154.2),
    rotation: 7.853981633974483
  }, {
    name: 'minute 47',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.1, 154),
    rotation: 7.958701389094143
  }, {
    name: 'minute 48',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.3, 154),
    rotation: 8.063421144213802
  }, {
    name: 'minute 49',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.4, 154),
    rotation: 8.168140899333462
  }, {
    name: 'minute 50',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.5, 154.1),
    rotation: 8.272860654453122
  }, {
    name: 'minute 51',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(-86.2, 14.8),
    rotation: 8.377580409572783
  }, {
    name: 'minute 52',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.7, 154.2),
    rotation: 8.482300164692441
  }, {
    name: 'minute 53',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.7, 154.3),
    rotation: 8.587019919812102
  }, {
    name: 'minute 54',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.8, 154.3),
    rotation: 8.69173967493176
  }, {
    name: 'minute 55',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(155.9, 154.4),
    rotation: 8.79645943005142
  }, {
    name: 'minute 56',
    extent: pt(8, 28),
    fill: Color.rgb(0, 0, 0),
    origin: pt(3.2, 434.1),
    position: pt(16.2, -87),
    rotation: 8.901179185171081
  }, {
    name: 'minute 57',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(156, 154.6),
    rotation: 9.005898940290741
  }, {
    name: 'minute 58',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(156, 154.7),
    rotation: 9.1106186954104
  }, {
    name: 'minute 59',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(156.1, 154.8),
    rotation: 9.215338450530059
  }, {
    name: 'minute 60',
    extent: pt(3, 10),
    fill: Color.rgb(0, 0, 0),
    origin: pt(0.5, 155),
    position: pt(156.1, 154.9),
    rotation: 9.320058205649719
  }, {
    name: 'hour hand',
    borderColor: Color.rgb(123, 125, 125),
    borderStyle: 'dashed',
    draggable: true,
    dropShadow: new ShadowObject({ distance: 0, color: Color.rgba(0, 0, 0, 0.36), blur: 9, fast: false }),
    extent: pt(19, 128.8),
    fill: Color.rgb(0, 0, 0),
    grabbable: true,
    origin: pt(8.6, 25.5),
    position: pt(155, 155),
    rotation: 3.6564647829281203
  }, {
    name: 'second hand',
    borderColor: Color.rgb(123, 125, 125),
    borderStyle: 'dashed',
    dropShadow: new ShadowObject({ distance: 0, color: Color.rgba(0, 0, 0, 0.36), blur: 9 }),
    extent: pt(4.4, 166.6),
    fill: Color.rgb(244, 67, 54),
    origin: pt(0.6, 48.7),
    position: pt(155, 155),
    rotation: 4.847880570336013,
    submorphs: [{
      type: Ellipse,
      name: 'ellipse',
      borderColor: Color.rgb(123, 125, 125),
      borderStyle: 'dashed',
      draggable: true,
      dropShadow: false,
      extent: pt(28.2, 27.5),
      fill: Color.rgb(244, 67, 54),
      grabbable: true,
      isEllipse: true,
      position: pt(-13.4, 92.7)
    }]
  }]
});

export { Clock };
