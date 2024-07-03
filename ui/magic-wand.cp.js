import { component, ViewModel } from 'lively.morphic';
import { pt } from 'lively.graphics/geometry-2d.js';
import { Color } from 'lively.graphics/color.js';
import { Polygon } from 'lively.morphic/morph.js';

class MagicWandModel extends ViewModel {
  viewDidLoad () {
    const { star } = this.ui;
    star.startStepping(5, 'rotateBy', Math.PI / 180);
  }
}

const MagicWand = component({
  defaultViewModel: MagicWandModel,
  name: 'wand',
  borderColor: Color.rgb(23, 160, 251),
  extent: pt(19, 193.5),
  fill: Color.rgb(108, 45, 23),
  position: pt(540, 362),
  submorphs: [{
    type: Polygon,
    name: 'star',
    borderColor: Color.rgb(23, 160, 251),
    extent: pt(150, 150),
    fill: Color.rgb(238, 251, 0),
    origin: pt(75, 72.5),
    position: pt(5.5, -3.5),
    vertices: [({ position: pt(114.87894736842102, 72.29188405797092), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(149.49999999999994, 116.94028985507231), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(92.58508771929814, 100.43797101449258), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(57.08976608187129, 144.49999999999983), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(56.565204678362534, 89.6318840579709), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(0, 72.29188405797092), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(56.565204678362534, 54.86811594202891), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(57.08976608187129, 0), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(92.58508771929814, 44.06202898550717), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(149.49999999999994, 27.559710144927493), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } }), ({ position: pt(114.87894736842102, 72.29188405797092), isSmooth: false, controlPoints: { next: pt(0, 0), previous: pt(0, 0) } })]
  }]
});

export { MagicWand };
