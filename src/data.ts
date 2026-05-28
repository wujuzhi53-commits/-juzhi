import { WorkItem, SkillItem } from './types';

export const DESIGN_WORKS: WorkItem[] = [
  {
    id: 'graphic-morning',
    category: 'graphic',
    title: '《流动的晨曦》艺术装帧设计',
    subtitle: 'Graphic / Editorial Concept Book',
    description: '探索特种触感工艺低调温润的物理特性，用慢速曝光的光学色母过渡记录清晨6点的气温与湿度变化。低噪点珠光印痕与温暖纸质相互渗透，散发属于清晨的安宁与微茫。',
    materialDetails: '装帧：180g 雅莲珠光艺术纸 / 锁线裸脊 / 手工亚麻灰线定缝',
    colorPalette: ['#FAF5EF', '#EBE5FC', '#FCEEF2', '#E1DCF5'],
    imagePlaceholderColor: '#F7F4FA',
    illustrationSvgId: 'graphic-book'
  },
  {
    id: 'ip-companion',
    category: 'ip',
    title: '《Milo & Cloud》微光星尘守护灵',
    subtitle: 'Character Design / Healing IP',
    description: '为内心敏感、偶感孤独的现代都市旅人设计的桌面疗愈微光实体。其灵感来源于童年枕边未散去的清香。温顺糯软的舒芙蕾云朵轮廓，周身自带恒定的浅色星环与暖黄碎光。',
    materialDetails: '规格：哑光弹性软胶 / 潮玩微雕 / 三维动态呼吸灯模组',
    colorPalette: ['#E6F0FA', '#FCEEF2', '#FFFDEF', '#DCECF7'],
    imagePlaceholderColor: '#F4F7FC',
    illustrationSvgId: 'ip-milo'
  },
  {
    id: 'ecommerce-aroma',
    category: 'ecommerce',
    title: '《白茶与信使》香氛生活美学视觉',
    subtitle: 'Branding / Scent Visualization',
    description: '极简白茶精油香氛的主题视觉表达。彻底抛弃繁杂的素材堆砌，以充足的主题文字留白、磨砂玻璃曲面和植物微影格栅，表达无声且意境悠长的清冽茶息与泥土芬芳。',
    materialDetails: '媒介：线上品牌旗舰端定制页面 / 精装亚光信封画册',
    colorPalette: ['#F5EFEB', '#EAEFEA', '#FAF5EF', '#DFE8DF'],
    imagePlaceholderColor: '#F5FAF5',
    illustrationSvgId: 'aroma-style'
  },
  {
    id: 'modeling-mansion',
    category: 'modeling',
    title: '《时间慢速居所》微缩写意庭院',
    subtitle: '3D Spatial Modeling / Low Poly Blender',
    description: '利用漫反射磨砂发光、无锋利棱角的弧面几何形体，在三维数字沙盒中雕琢出一处极富呼吸感的隐修空间。慢摇镜下，唯有透光纱窗、柔顺风铃在匀速微动。',
    materialDetails: '软件：Blender 4.2 / Cycles物理写实渲染 / 折射磨砂玻璃介质',
    colorPalette: ['#F3F2F8', '#FBF6EE', '#E7EBFA', '#E2ECF5'],
    imagePlaceholderColor: '#FAFBFD',
    illustrationSvgId: 'room-3d'
  }
];

export const SKILL_ITEMS: SkillItem[] = [
  {
    name: '视觉综合审美功底 (AESTHETIC & BRANDING)',
    percentage: 95,
    description: '卓越的低饱和度、高呼吸感日系/北欧极简美学色彩管理能力。对特种纸张质感、微动交互感知、视觉叙事结构有着偏执的极致追求，擅长将冰冷的商业数据用温润舒缓的视觉媒介柔软包装。',
    subSkills: ['原创色彩质感管理', '高品位留白板式', '微动态UI交互流设计', '触觉纸张工艺搭配']
  },
  {
    name: '三维疗愈场景雕琢 (3D BLENDER SCENE)',
    percentage: 88,
    description: '熟练掌握无锋利刚性边角的微缩粘土、磨砂透光玻璃、温暖粉状发光材质建模与打光，擅长重塑极富安全感的卧室、治愈猫咪庭院等低阻力慢节奏情绪空间。',
    subSkills: ['Low-poly温润场景建模', '微型微光粒子打光', '材质细节雕琢', '循环慢动作摄像机轨迹']
  },
  {
    name: '平面艺术与排版视觉 (GRAPHIC & LAYOUT)',
    percentage: 92,
    description: '精通海报画册、书籍装帧、原创插画、以及生活方式类品牌的视觉重塑。善用流畅克制的现代无衬线字体与优雅经典的精美衬线字，保证极致留白带来的空气充盈质感。',
    subSkills: ['极简视觉叙事', '书籍创意材料设计', '多段文字意境排版', '印刷物纸张及雕工']
  },
  {
    name: '治愈系IP与角色潮玩 (CHARACTER CONCEPT)',
    percentage: 90,
    description: '专注于软萌温顺、云雾绒毛形态以及童话治愈风格的角色草图设计与模型化建立。拒绝强红蓝碰撞、搞怪尖锐设计，塑造具有稳定高亲和力、微光微表情的无防备感人设。',
    subSkills: ['人设定音与世界观', '微萌微表情设计', '衍生盲盒周边视觉', '毛绒与软胶材质复刻']
  }
];
