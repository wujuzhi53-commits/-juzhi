import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, ArrowRight, X, Heart, Palette, Feather, Trash2, Plus, UploadCloud, Edit2, ZoomIn, ZoomOut, Move, Maximize2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryType, WorkItem } from '../types';
import { DESIGN_WORKS } from '../data';
import { playClickSound, playHoverSound, playTransitionSound } from '../utils/audio';

// Dynamic Illustration Component that makes each work card look like a custom artistic masterpiece
function CardIllustration({ type, isHovered, imageUrl }: { type: string; isHovered: boolean; imageUrl?: string }) {
  const commonFrameClasses = "w-full h-48 rounded-2xl relative overflow-hidden transition-all duration-700 flex items-center justify-center border border-white/45 shadow-[inset_0_2px_18px_rgba(255,255,255,0.4)]";
  
  if (imageUrl) {
    return (
      <div className={`${commonFrameClasses} bg-[#EBE5FC]/10`}>
        <motion.img 
          src={imageUrl} 
          alt="Custom design" 
          referrerPolicy="no-referrer"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    );
  }
  
  if (type === 'graphic-book') {
    return (
      <div 
        className={`${commonFrameClasses} bg-gradient-to-tr from-[#FAF5EF] via-[#EBE5FC]/60 to-[#FCEEF2]/60`}
      >
        <motion.div 
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-32 h-36 flex flex-col justify-between p-3 rounded-lg bg-white/75 border border-white/80 shadow-[0_8px_24px_rgba(139,92,246,0.04)] ring-1 ring-purple-100/10 select-none"
        >
          {/* Cover aesthetic lines */}
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] text-violet-400">Vol. 01</span>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          </div>
          
          {/* Soft color swatches */}
          <div className="my-2 flex flex-col gap-1.5">
            <div className="h-4 rounded bg-gradient-to-r from-violet-200 to-purple-100 opacity-60 w-3/4" />
            <div className="h-2 rounded bg-amber-100 opacity-80 w-1/2" />
            <div className="h-1 rounded bg-gray-200 opacity-40 w-5/6" />
          </div>

          <div className="flex justify-between items-end border-t border-gray-100/60 pt-2">
            <span className="font-sans text-[7px] text-gray-400 tracking-wider">Aria Editorial</span>
            <Feather className="w-2.5 h-2.5 text-violet-300" />
          </div>
        </motion.div>

        {/* Floating background blobs */}
        <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-violet-100/50 blur-xl transition-transform duration-1000 ${isHovered ? 'scale-125' : ''}`} />
        <div className={`absolute -left-4 -top-4 w-24 h-24 rounded-full bg-amber-50/70 blur-xl transition-transform duration-1000 ${isHovered ? 'scale-125' : ''}`} />
      </div>
    );
  }

  if (type === 'ip-milo') {
    return (
      <div 
        className={`${commonFrameClasses} bg-gradient-to-tr from-[#E6F0FA] via-[#FCEEF2]/60 to-[#FFFDEF]/70`}
      >
        <div className="relative flex flex-col items-center">
          {/* Soft cloud body */}
          <motion.div 
            animate={{ 
              y: isHovered ? [-2, 2, -2] : [0, -3, 0],
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ 
              repeat: Infinity, 
              duration: isHovered ? 2.5 : 4, 
              ease: "easeInOut" 
            }}
            className="w-24 h-16 rounded-full bg-white relative shadow-[0_8px_32px_rgba(235,229,252,0.15)] flex flex-col items-center justify-center p-2 border border-white/90"
          >
            {/* Cute cloud cheeks and eyes */}
            <div className="flex gap-4 items-center mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-200/80 animate-ping absolute" />
              <div className="w-1 h-1 rounded-full bg-[#998FA0]" />
              <div className="w-1 h-1 rounded-full bg-[#998FA0]" />
            </div>
            
            <div className="flex justify-between w-10 px-1">
              <div className="w-1.5 h-1 rounded-full bg-rose-200" />
              <div className="w-1.5 h-1 rounded-full bg-rose-200" />
            </div>

            {/* Glowing sleeping star beside it */}
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-200 rounded-full blur-[2px] animate-pulse-slow" />
          </motion.div>

          {/* Miniature floor reflection */}
          <div className={`w-14 h-1.5 bg-sky-100/40 rounded-full blur-[2px] mt-3 transition-opacity duration-700 ${isHovered ? 'opacity-90' : 'opacity-40'}`} />
        </div>
      </div>
    );
  }

  if (type === 'aroma-style') {
    return (
      <div 
        className={`${commonFrameClasses} bg-gradient-to-tr from-[#F5EFEB] via-[#EAEFEA]/50 to-[#FAF5EF]/60`}
      >
        <div className="relative flex items-center justify-center gap-4">
          {/* Glass Cologne bottle */}
          <motion.div 
            animate={{ rotate: isHovered ? 1.5 : 0 }}
            transition={{ duration: 1.2 }}
            className="w-16 h-28 rounded-lg bg-white/70 border border-white/90 shadow-[0_6px_20px_rgba(139,120,246,0.03)] flex flex-col items-center justify-between p-2 relative"
          >
            {/* Wooden cork */}
            <div className="w-6 h-4 bg-amber-500/25 rounded border border-amber-600/10" />
            
            {/* Label */}
            <div className="w-12 py-3 rounded bg-white border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.01)] text-center flex flex-col justify-center items-center">
              <div className="w-4 h-0.5 bg-green-200 mb-1" />
              <span className="font-serif text-[6px] tracking-wider text-green-700 leading-none">WHITE TEA</span>
              <span className="font-sans text-[4px] text-gray-400">Scent 03</span>
            </div>

            <div className="w-12 h-0.5 bg-amber-100" />
          </motion.div>

          {/* Organic aesthetic floral leaf */}
          <motion.div 
            animate={{ 
              rotate: isHovered ? [-5, 5, -5] : [0, -2, 0] 
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="h-20 w-8 flex flex-col gap-2.5 border-l border-green-200/45 pl-2 py-1"
          >
            <div className="w-2.5 h-1.5 rounded-full bg-green-200/50 -rotate-12" />
            <div className="w-3 h-1.5 rounded-full bg-green-300/40 rotate-12 self-end" />
            <div className="w-2.5 h-1.5 rounded-full bg-green-200/50 -rotate-12" />
          </motion.div>
        </div>
      </div>
    );
  }

  // 3D Miniature Room block
  return (
    <div 
      className={`${commonFrameClasses} bg-gradient-to-tr from-[#F3F2F8] via-[#FBF6EE]/60 to-[#E7EBFA]/60`}
    >
      <div className="relative">
        {/* Curved isometric wall framework */}
        <motion.div 
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.8 }}
          className="w-32 h-28 rounded-2xl bg-white/80 border border-white/90 shadow-[0_12px_28px_rgba(0,0,0,0.02)] relative flex items-center justify-center"
        >
          {/* Round glass window */}
          <div className="absolute top-3 w-14 h-14 rounded-full bg-[#EAE8F5]/40 border border-white/80 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            <div className="w-0.5 h-14 bg-white/50 absolute" />
            <div className="h-0.5 w-14 bg-white/50 absolute" />
            
            {/* Pastel yellow sunset light coming in */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-100/10 to-amber-200/20 mix-blend-soft-light" />
          </div>

          <Palette className="w-4 h-4 text-violet-300 absolute bottom-3 left-4 animate-pulse" />
          <div className="w-8 h-4 bg-violet-100/30 border border-violet-100 rounded-full absolute bottom-3 right-4 flex items-center justify-center">
            <span className="font-mono text-[6px] text-violet-400">3D-MESH</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const COLOR_PRESETS = [
  { name: '薄暮熏衣草 (Twilight)', colors: ['#FAF5EF', '#EBE5FC', '#FCEEF2', '#E1DCF5'] },
  { name: '春木嫩泉 (Sage)', colors: ['#F5EFEB', '#EAEFEA', '#FAF5EF', '#DFE8DF'] },
  { name: '雨过天青 (Sky)', colors: ['#E6F0FA', '#FCEEF2', '#FFFDEF', '#DCECF7'] },
  { name: '暖波和鸣 (Sand)', colors: ['#F3F2F8', '#FBF6EE', '#E7EBFA', '#E2ECF5'] }
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Administrative / Builder mode state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('aria_is_admin') === 'true';
    } catch {
      return false;
    }
  });
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPass, setAdminPass] = useState('');

  // Hidden default presets tracker
  const [hiddenPresetIds, setHiddenPresetIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aria_hidden_presets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Preset edits tracker synced with localStorage so that default items can be customized by the builder
  const [presetEdits, setPresetEdits] = useState<Record<string, Partial<WorkItem>>>(() => {
    try {
      const saved = localStorage.getItem('aria_preset_edits');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // State for real-time deleted or hidden works history
  const [deletedWorks, setDeletedWorks] = useState<WorkItem[]>(() => {
    try {
      const savedCustomDeleted = localStorage.getItem('aria_deleted_custom_works');
      const customDeleted: WorkItem[] = savedCustomDeleted ? JSON.parse(savedCustomDeleted) : [];
      
      const savedHidden = localStorage.getItem('aria_hidden_presets');
      const hiddenIds: string[] = savedHidden ? JSON.parse(savedHidden) : [];
      const hiddenPresets = DESIGN_WORKS.filter(work => hiddenIds.includes(work.id));
      
      return [...customDeleted, ...hiddenPresets];
    } catch {
      return [];
    }
  });

  // Dynamic floating Toast message state for real-time visual deletion feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimeoutId, setToastTimeoutId] = useState<any>(null);

  // Edit tracking state (keeps track of which Work ID is undergoing modification)
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);

  // Lightbox overlay variables for fluid scaling and drag panning
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [lightboxPosition, setLightboxPosition] = useState({ x: 0, y: 0 });
  const [isDraggingLightbox, setIsDraggingLightbox] = useState(false);
  const [lightboxDragStart, setLightboxDragStart] = useState({ x: 0, y: 0 });

  // Floating mouse magnifier lens state within detail card
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [lensBgPosition, setLensBgPosition] = useState("50% 50%");

  // Slide state for detail modal multi-image viewing
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  // Custom uploaded works state synced with localStorage
  const [customWorks, setCustomWorks] = useState<WorkItem[]>(() => {
    try {
      const saved = localStorage.getItem('aria_custom_works');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Upload Modal form states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newMaterialDetails, setNewMaterialDetails] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryType>('ip');
  const [dragActive, setDragActive] = useState(false);
  const [selectedPaletteIdx, setSelectedPaletteIdx] = useState(0);

  const categories: { id: CategoryType | 'all'; name: string; labelEn: string }[] = [
    { id: 'all', name: '全部作品', labelEn: 'ALL WORKS' },
    { id: 'graphic', name: '平面设计', labelEn: 'GRAPHIC' },
    { id: 'ip', name: 'IP设计', labelEn: 'CHARACTER IP' },
    { id: 'ecommerce', name: '电商设计', labelEn: 'E-COMMERCE' },
    { id: 'modeling', name: '建模设计', labelEn: '3D MODELING' }
  ];

  const handleCategoryChange = (catId: CategoryType | 'all') => {
    if (catId === selectedCategory) return;
    playTransitionSound();
    setSelectedCategory(catId);
  };

  // Combine original preset works with potential builder adjustments, then merge custom uploads
  const allWorks = [
    ...DESIGN_WORKS.map((work) => {
      if (presetEdits[work.id]) {
        return { ...work, ...presetEdits[work.id] };
      }
      return work;
    }),
    ...customWorks
  ].filter(work => !hiddenPresetIds.includes(work.id));

  const filteredWorks = selectedCategory === 'all'
    ? allWorks
    : allWorks.filter(work => work.category === selectedCategory);

  const handleCardClick = (work: WorkItem) => {
    playClickSound();
    setSelectedWork(work);
    setActiveSlideIdx(0);
  };

  const handleCloseModal = () => {
    playClickSound();
    setSelectedWork(null);
  };

  const handleHoverElement = () => {
    playHoverSound();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const addWatermarkToImage = (base64Str: string, callback: (result: string) => void) => {
    try {
      if (!base64Str) {
        callback(base64Str);
        return;
      }
      const img = new Image();
      if (base64Str.startsWith('http') || base64Str.startsWith('https')) {
        img.crossOrigin = 'anonymous'; // Safe CORS for external HTTP URLs
      }
      img.onload = () => {
        try {
          // Dynamic downscaling to max 1200px to prevent hitting localStorage quota limits (usually 5MB total)
          let width = img.naturalWidth || img.width || 800;
          let height = img.naturalHeight || img.height || 600;
          const maxDim = 1200;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            callback(base64Str);
            return;
          }
          
          // Draw scaled picture
          ctx.drawImage(img, 0, 0, width, height);
          
          // Create watermark pattern canvas
          const patternCanvas = document.createElement('canvas');
          // Proportional scale factor relative to standard 1200px width
          const scaleFactor = Math.max(0.6, Math.min(2.5, canvas.width / 1200));
          const tileW = Math.round(280 * scaleFactor);
          const tileH = Math.round(185 * scaleFactor);
          patternCanvas.width = tileW;
          patternCanvas.height = tileH;
          
          const pCtx = patternCanvas.getContext('2d');
          if (pCtx) {
            pCtx.translate(tileW / 2, tileH / 2);
            pCtx.rotate(-28 * Math.PI / 180);
            pCtx.textAlign = 'center';
            pCtx.textBaseline = 'middle';
            
            const fontSize = Math.round(15 * scaleFactor);
            pCtx.font = `500 ${fontSize}px "Inter", "Microsoft YaHei", sans-serif`;
            
            // Premium transparent bas-relief (shallow relief / emboss) look
            // Dark bottom-right offset shadow for white background readability
            pCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            pCtx.fillText('芷澄 Aria Yang', 1, 1);
            
            // Light foreground offset highlight for dark background readability
            pCtx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            pCtx.fillText('芷澄 Aria Yang', 0, 0);
          }
          
          // Repeat the watermark pattern over the entire image canvas
          const pattern = ctx.createPattern(patternCanvas, 'repeat');
          if (pattern) {
            ctx.save();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = pattern;
            ctx.fill();
            ctx.restore();
          }
          
          let mimeType = 'image/jpeg';
          if (base64Str.startsWith('data:image/png')) mimeType = 'image/png';
          else if (base64Str.startsWith('data:image/webp')) mimeType = 'image/webp';
          
          const result = canvas.toDataURL ? canvas.toDataURL(mimeType, 0.88) : base64Str;
          callback(result);
        } catch (err) {
          console.error('Watermark generation error inside onload', err);
          callback(base64Str);
        }
      };
      img.onerror = (err) => {
        console.error('Image load error in watermark', err);
        callback(base64Str);
      };
      img.src = base64Str;
    } catch (e) {
      console.error('Watermark generation top-level error', e);
      callback(base64Str);
    }
  };

  const handleFiles = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(file => {
      const isImg = file.type.match('image.*');
      if (!isImg) {
        alert(`文件 "${file.name}" 不是有效的图片文件，将被忽略哦 🌸`);
      }
      return isImg;
    });

    if (validFiles.length === 0) return;

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          addWatermarkToImage(e.target.result as string, (watermarkedBase64) => {
            setUploadedImages(prev => [...prev, watermarkedBase64]);
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleOpenUploadModal = () => {
    playClickSound();
    setEditingWorkId(null);
    setNewCategory(selectedCategory === 'all' ? 'ip' : selectedCategory);
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
    setNewMaterialDetails('');
    setUploadedImages([]);
    setSelectedPaletteIdx(0);
    setIsUploadOpen(true);
  };

  const handleOpenEditModal = (work: WorkItem) => {
    playClickSound();
    setEditingWorkId(work.id);
    setNewCategory(work.category);
    setNewTitle(work.title);
    setNewSubtitle(work.subtitle);
    setNewDescription(work.description);
    setNewMaterialDetails(work.materialDetails);
    
    // Load existing pictures
    const preImages = work.imageUrls || (work.imageUrl ? [work.imageUrl] : []);
    setUploadedImages(preImages);

    // Track matching color presets index if possible
    const matchIdx = COLOR_PRESETS.findIndex(p => 
      p.colors.length === work.colorPalette.length && 
      p.colors.every((c, idx) => c === work.colorPalette[idx])
    );
    setSelectedPaletteIdx(matchIdx !== -1 ? matchIdx : 0);
    
    setIsUploadOpen(true);
  };

  const handleSaveCustomWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedImages.length === 0) {
      alert('请选择或拖放至少一张作品图片进行上传 🌸');
      return;
    }

    const defaultTitle = newTitle.trim() || '未命名创意设计物';
    const defaultSubtitle = newSubtitle.trim() || `${newCategory.toUpperCase()} / Concept Design`;
    const defaultDesc = newDescription.trim() || '在一场安静的心灵漫游中完成的灵感手作。没有目的，只有随心流动的光影与笔触。';
    const defaultMaterials = newMaterialDetails.trim() || '工艺细节：数位板作画 / 原创像素流 / 磨砂质感叠合';

    if (editingWorkId) {
      // Editing Mode:
      if (editingWorkId.startsWith('custom-')) {
        const updated = customWorks.map(w => {
          if (w.id === editingWorkId) {
            return {
              ...w,
              category: newCategory,
              title: defaultTitle,
              subtitle: defaultSubtitle,
              description: defaultDesc,
              materialDetails: defaultMaterials,
              colorPalette: COLOR_PRESETS[selectedPaletteIdx].colors,
              imageUrl: uploadedImages[0],
              imageUrls: uploadedImages
            };
          }
          return w;
        });
        setCustomWorks(updated);
        try {
          localStorage.setItem('aria_custom_works', JSON.stringify(updated));
        } catch (e) {
          console.error('LocalStorage quota exceeded info:', e);
          alert('温馨提示：由于您的浏览器本地存储（LocalStorage）空间已满，此修改在刷新重载页面后可能无法保存，但当前会话依然生效。建议缩减图片数量或上传较小的图片哦 🌸');
        }
      } else {
        // Edit default preset items natively (stored in presetEdits key-value dictionary)
        const updatedEdits = {
          ...presetEdits,
          [editingWorkId]: {
            category: newCategory,
            title: defaultTitle,
            subtitle: defaultSubtitle,
            description: defaultDesc,
            materialDetails: defaultMaterials,
            colorPalette: COLOR_PRESETS[selectedPaletteIdx].colors,
            imageUrl: uploadedImages[0],
            imageUrls: uploadedImages
          }
        };
        setPresetEdits(updatedEdits);
        try {
          localStorage.setItem('aria_preset_edits', JSON.stringify(updatedEdits));
        } catch (e) {
          console.error('LocalStorage quota exceeded info:', e);
          alert('温馨提示：您的浏览器本地存储空间已满，修改在刷新后可能恢复默认。建议提交较少或压缩后的图集哦 🌸');
        }
      }

      // Sync active view item in detail drawer if currently open
      if (selectedWork?.id === editingWorkId) {
        setSelectedWork({
          ...selectedWork,
          category: newCategory,
          title: defaultTitle,
          subtitle: defaultSubtitle,
          description: defaultDesc,
          materialDetails: defaultMaterials,
          colorPalette: COLOR_PRESETS[selectedPaletteIdx].colors,
          imageUrl: uploadedImages[0],
          imageUrls: uploadedImages
        });
      }

      setEditingWorkId(null);
    } else {
      // Addition Mode (Create new custom card):
      const newWork: WorkItem = {
        id: `custom-${Date.now()}`,
        category: newCategory,
        title: defaultTitle,
        subtitle: defaultSubtitle,
        description: defaultDesc,
        materialDetails: defaultMaterials,
        colorPalette: COLOR_PRESETS[selectedPaletteIdx].colors,
        imagePlaceholderColor: '#FFFFFF',
        illustrationSvgId: '',
        imageUrl: uploadedImages[0],
        imageUrls: uploadedImages
      };

      const updated = [newWork, ...customWorks];
      setCustomWorks(updated);
      try {
        localStorage.setItem('aria_custom_works', JSON.stringify(updated));
      } catch (e) {
        console.error('LocalStorage quota exceeded info:', e);
        alert('温馨提示：由于您的浏览器本地存储（LocalStorage）空间已满，此创意作品在刷新页面后可能无法保存，但当前展示中已成功载入。建议上传较小的图片或单张图片哦 🌸');
      }
    }
    
    playClickSound();
    setIsUploadOpen(false);
  };

  const handleDeleteWork = (id: string) => {
    playTransitionSound();
    
    // Find the item being deleted to support real-time history and toast
    const targetWork = allWorks.find(w => w.id === id);
    if (targetWork) {
      setDeletedWorks(prev => {
        const alreadyExists = prev.some(w => w.id === id);
        if (alreadyExists) return prev;
        const newDeleted = [targetWork, ...prev];
        if (id.startsWith('custom-')) {
          localStorage.setItem('aria_deleted_custom_works', JSON.stringify(newDeleted.filter(w => w.id.startsWith('custom-'))));
        }
        return newDeleted;
      });

      // Clear existing toast timeout and show a new toast
      if (toastTimeoutId) {
        clearTimeout(toastTimeoutId);
      }
      setToastMessage(`图集《${targetWork.title}》已成功从主页移除 ✧`);
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5500);
      setToastTimeoutId(timer);
    }

    if (id.startsWith('custom-')) {
      const updated = customWorks.filter(w => w.id !== id);
      setCustomWorks(updated);
      localStorage.setItem('aria_custom_works', JSON.stringify(updated));
    } else {
      const updated = [...hiddenPresetIds, id];
      setHiddenPresetIds(updated);
      localStorage.setItem('aria_hidden_presets', JSON.stringify(updated));
    }
    
    if (selectedWork?.id === id) {
      setSelectedWork(null);
    }
  };

  const handleRestoreWork = (id: string) => {
    playTransitionSound();
    
    const workToRestore = deletedWorks.find(w => w.id === id);
    if (!workToRestore) return;

    // Remove from deleted list
    setDeletedWorks(prev => {
      const filtered = prev.filter(w => w.id !== id);
      if (id.startsWith('custom-')) {
        localStorage.setItem('aria_deleted_custom_works', JSON.stringify(filtered.filter(w => w.id.startsWith('custom-'))));
      }
      return filtered;
    });

    if (id.startsWith('custom-')) {
      const updated = [workToRestore, ...customWorks];
      setCustomWorks(updated);
      localStorage.setItem('aria_custom_works', JSON.stringify(updated));
    } else {
      const updated = hiddenPresetIds.filter(hid => hid !== id);
      setHiddenPresetIds(updated);
      localStorage.setItem('aria_hidden_presets', JSON.stringify(updated));
    }

    // Show a small restoration toast
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    setToastMessage(`图集《${workToRestore.title}》已成功重新载入展示 ✧`);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    setToastTimeoutId(timer);
  };

  const handleToggleAdmin = () => {
    playClickSound();
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.setItem('aria_is_admin', 'false');
      setShowAdminInput(false);
    } else {
      setShowAdminInput(prev => !prev);
    }
  };

  const handleAdminVerify = () => {
    playTransitionSound();
    if (adminPass.trim() === '6711985') {
      setIsAdmin(true);
      localStorage.setItem('aria_is_admin', 'true');
      setShowAdminInput(false);
      setAdminPass('');
    } else {
      alert('密码错误，请确认后重新输入 🌸');
    }
  };

  return (
    <section 
      id="gallery" 
      className="py-24 max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-12"
    >
      {/* 20px Left-aligned vertical glow category selector sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 flex flex-col gap-6 p-5 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(157,129,187,0.08)]">
          <div className="px-3 border-l-2 border-[#9D81BB]">
            <h3 className="font-sans font-medium text-charcoal-800 text-base tracking-wider">
              设计类目
            </h3>
            <p className="font-mono text-[13px] text-gray-400 tracking-widest uppercase">
              CATEGORIES
            </p>
          </div>

          <div className="flex flex-col gap-1.5" role="tablist">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  onMouseEnter={handleHoverElement}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-500 cursor-pointer relative flex flex-col ${
                    isSelected
                      ? 'bg-white/80 border border-white/80 shadow-[0_4px_16px_rgba(157,129,187,0.06)] scale-[1.02]'
                      : 'border border-transparent hover:bg-white/20'
                  }`}
                >
                  {/* Subtle active category lamp ornament */}
                  {isSelected && (
                    <motion.div 
                      layoutId="sidebarActiveLamp"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#9D81BB] to-[#9D81BB]/70 rounded-r-full shadow-[0_0_8px_rgba(157,129,187,0.5)]"
                    />
                  )}
                  
                  <span className={`font-sans text-sm font-semibold tracking-wide transition-colors duration-300 ${isSelected ? 'text-[#9D81BB]' : 'text-gray-600'}`}>
                    {cat.name}
                  </span>
                  <span className={`font-mono text-[11px] tracking-wider uppercase transition-colors duration-300 ${isSelected ? 'text-[#9D81BB]/80' : 'text-gray-400'}`}>
                    {cat.labelEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Aesthetic tiny bio block */}
          <div className="mt-4 p-3 rounded-2xl bg-[#EBE5FC]/10 border border-[#EBE5FC]/15 text-center">
            <p className="font-sans text-[14px] text-[#7A719C]/90 leading-relaxed font-light">
              “纯手工拼贴光影艺术，捕捉日常生活的温热与慢速。”
            </p>
          </div>

          {/* 搭建者控制台 (Builder Control Panel) */}
          <div className="mt-2 pt-4 border-t border-purple-50/50 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider font-semibold uppercase">
                {isAdmin ? (
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    搭建者后台已解锁
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    游人状态
                  </span>
                )}
              </div>
              
              <button
                type="button"
                onClick={handleToggleAdmin}
                className={`text-[11px] font-sans px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                  isAdmin 
                    ? 'bg-purple-100/40 border-[#9D81BB]/20 text-[#9D81BB] hover:bg-purple-200/50'
                    : 'bg-white/60 border-gray-200 text-gray-500 hover:bg-white/95 hover:border-gray-300'
                }`}
              >
                {isAdmin ? '退出管理' : '搭建者入口'}
              </button>
            </div>

            {/* Passcode Drawer */}
            <AnimatePresence>
              {showAdminInput && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-1 space-y-1.5"
                >
                  <div className="flex gap-1.5">
                    <input
                      type="password"
                      placeholder="请输入验证密码"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAdminVerify();
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white/75 border border-purple-100 text-xs font-sans focus:outline-none focus:border-[#9D81BB] flex-1 max-w-[130px]"
                    />
                    <button
                      type="button"
                      onClick={handleAdminVerify}
                      className="px-3 py-1.5 rounded-xl bg-[#9D81BB] text-white text-xs font-sans cursor-pointer hover:bg-[#9D81BB]/90 shadow-sm"
                    >
                      验证
                    </button>
                  </div>
                  <span className="text-[9px] text-gray-400 block font-light leading-snug">
                    非公开管理模块。非搭建者请勿点击，开启后将允许在主页删除图集内容。
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Real-time Deleted Works History Panel */}
            {isAdmin && deletedWorks.length > 0 && (
              <div className="mt-4 pt-4 border-t border-purple-100/40 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider">
                  <span className="flex items-center gap-1.5 font-semibold text-rose-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                    已删除图集 ({deletedWorks.length})
                  </span>
                  {hiddenPresetIds.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('确定要一键恢复所有隐藏的预设图集吗？')) {
                          setHiddenPresetIds([]);
                          localStorage.removeItem('aria_hidden_presets');
                          setDeletedWorks(prev => prev.filter(w => w.id.startsWith('custom-')));
                          playTransitionSound();
                        }
                      }}
                      className="text-gray-400 hover:text-[#9D81BB] duration-200 cursor-pointer font-sans normal-case text-[9px] font-medium border-0 bg-transparent"
                    >
                      一键预设还原
                    </button>
                  )}
                </div>
                <div className="max-h-52 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  <AnimatePresence initial={false}>
                    {deletedWorks.filter(Boolean).map((work) => (
                      <motion.div
                        key={work.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10, scale: 0.9 }}
                        className="flex items-center justify-between p-2 rounded-xl bg-rose-50/40 border border-rose-100/30 text-xs font-sans text-gray-600 gap-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] hover:bg-rose-50/70 transition-all duration-300"
                      >
                        <span className="truncate flex-1 font-medium font-sans text-[11px] text-justify" title={work.title}>
                          {work.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRestoreWork(work.id)}
                          title="点击实时重载此图集"
                          className="px-2 py-0.5 rounded-lg bg-[#9D81BB]/10 hover:bg-[#9D81BB]/20 hover:scale-105 active:scale-95 text-[#9D81BB] duration-200 transition-all font-sans text-[10px] cursor-pointer font-medium flex items-center gap-1 border-0"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          恢复
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Cards Showcase Section */}
      <div className="lg:col-span-3">
        <div className="mb-8 flex justify-between items-center px-2">
          <p className="font-mono text-sm text-gray-400 tracking-widest uppercase">
            SHOWCASING {filteredWorks.length} MASTERPIECE{filteredWorks.length > 1 ? 'S' : ''}
          </p>
          <div className="w-16 h-px bg-purple-100" />
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => {
              const isHovered = hoveredCardId === work.id;
              return (
                <motion.article
                  key={work.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => {
                    setHoveredCardId(work.id);
                    handleHoverElement();
                  }}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => handleCardClick(work)}
                  className="rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 hover:border-white/90 p-5 shadow-[0_8px_24px_rgba(157,129,187,0.06)] hover:shadow-[0_16px_40px_rgba(157,129,187,0.14)] transition-all duration-700 cursor-pointer flex flex-col group relative"
                >
                  {/* Administration / Edit Controls for verified Builder */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditModal(work);
                        }}
                        title="在线编辑此图集"
                        className="p-1.5 rounded-full bg-white/95 hover:bg-purple-50 border border-white/95 text-gray-400 hover:text-[#9D81BB] hover:scale-110 duration-300 transition-all shadow-md cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#9D81BB]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`确定要删除图集栏目《${work.title}》吗？`)) {
                            handleDeleteWork(work.id);
                          }
                        }}
                        title="删除该作品图集"
                        className="p-1.5 rounded-full bg-white/95 hover:bg-[#FFF5F5] border border-white/95 text-gray-400 hover:text-rose-500 hover:scale-110 duration-300 transition-all shadow-md cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                      </button>
                    </div>
                  )}

                  {/* Embedded high-quality custom procedural representation illustration */}
                  <div className="mb-4 rounded-2xl overflow-hidden relative">
                    <CardIllustration type={work.illustrationSvgId} isHovered={isHovered} imageUrl={work.imageUrl} />
                    
                    {/* Hover detail trigger layer */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center">
                      <div className="px-4 py-2 rounded-full bg-white/80 border border-white/90 text-sm font-sans tracking-wider text-[#9D81BB] flex items-center gap-1.5 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <Eye className="w-3.5 h-3.5" />
                        欣赏细节
                      </div>
                    </div>
                  </div>

                  {/* Soft metadata tags */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[12px] text-[#9C94B8] tracking-widest uppercase">
                      {work.subtitle.split(' / ')[0]}
                    </span>
                    <div className="flex gap-1">
                      {work.colorPalette.slice(0, 3).map((col, idx) => (
                        <div 
                          key={idx} 
                          className="w-2 h-2 rounded-full border border-white/80 shadow-sm"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Text Details */}
                  <h4 className="font-sans font-medium text-charcoal-800 text-lg tracking-wide mb-1 group-hover:text-[#9D81BB] transition-colors duration-300">
                    {work.title}
                  </h4>
                  <p className="font-sans text-sm text-gray-500 leading-relaxed font-light line-clamp-2">
                    {work.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-purple-50/50 flex justify-between items-center">
                    <span className="font-sans text-[12px] text-gray-400 tracking-wide font-light">
                      工艺质感：{work.materialDetails.split('：')[1]?.split(' / ')[0] || "手工高精定制"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#9D81BB] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </motion.article>
              );
            })}

            {/* Dynamic Custom-Upload Dashed Card */}
            <motion.article
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleOpenUploadModal}
              onMouseEnter={handleHoverElement}
              className="rounded-3xl bg-white/20 hover:bg-white/45 backdrop-blur-md border border-dashed border-[#9D81BB]/35 hover:border-[#9D81BB] p-6 shadow-[0_8px_24px_rgba(157,129,187,0.02)] hover:shadow-[0_16px_40px_rgba(157,129,187,0.08)] transition-all duration-700 cursor-pointer flex flex-col justify-center items-center text-center gap-5 min-h-[350px] group relative"
            >
              <div className="w-14 h-14 rounded-full bg-[#EBE5FC]/30 border border-white flex items-center justify-center text-[#9D81BB] group-hover:scale-110 group-hover:bg-[#EBE5FC]/50 transition-all duration-500 shadow-sm">
                <Plus className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-sans font-semibold text-charcoal-800 text-base tracking-wide group-hover:text-[#9D81BB] transition-colors duration-300">
                  绽放你的独家创作 ✦
                </h4>
                <p className="font-sans text-xs text-gray-400 leading-relaxed font-light max-w-[220px] mx-auto">
                  在此板块 ({selectedCategory === 'all' ? '全部' : categories.find(c => c.id === selectedCategory)?.name}) 亲手上传或拖入拼贴图片，让它浮泛于治愈星芒中。
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Immersive quiet, slow-fade details modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Dark cozy organic ambient dimming backdrop */}
            <div 
              className="fixed inset-0 bg-[#161224]/35 backdrop-blur-[12px] transition-all"
              onClick={handleCloseModal}
            />

            {/* Frosted details viewport */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/80 backdrop-blur-2xl border border-white/70 w-full max-w-3xl rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(22,18,36,0.18)] relative z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Left-hand aesthetic showcase preview */}
              <div className="md:w-1/2 bg-gradient-to-br from-[#FAF5EF]/40 to-[#EBE5FC]/30 flex flex-col justify-center items-center p-8 border-b md:border-b-0 md:border-r border-white/50 min-h-[300px] md:min-h-0">
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  {/* Miniature brand signature background layer */}
                  <div className="absolute top-4 left-4 font-mono text-[11px] text-[#9C94B8]/50 uppercase tracking-widest z-10">
                    Aria Design Studio ®
                  </div>

                  {selectedWork.imageUrls && selectedWork.imageUrls.length > 0 ? (
                    <div 
                      onClick={() => {
                        setLightboxScale(1);
                        setLightboxPosition({ x: 0, y: 0 });
                        setIsLightboxOpen(true);
                      }}
                      className="w-full h-64 rounded-2xl relative overflow-hidden bg-[#EBE5FC]/10 border border-white/50 shadow-[0_4px_24px_rgba(157,129,187,0.05)] group cursor-zoom-in"
                    >
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={activeSlideIdx}
                          src={selectedWork.imageUrls[activeSlideIdx]} 
                          alt={`Carousel slide ${activeSlideIdx + 1}`}
                          referrerPolicy="no-referrer"
                          initial={{ opacity: 0, scale: 1.02 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </AnimatePresence>
                      
                      {/* Left/Right controls */}
                      {selectedWork.imageUrls.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playClickSound();
                              setActiveSlideIdx(prev => (prev - 1 + selectedWork.imageUrls!.length) % selectedWork.imageUrls!.length);
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#9D81BB] flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 shadow-sm border border-white/30 z-10 font-sans"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playClickSound();
                              setActiveSlideIdx(prev => (prev + 1) % selectedWork.imageUrls!.length);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#9D81BB] flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 shadow-sm border border-white/30 z-10 font-sans"
                          >
                            ›
                          </button>

                          {/* Navigation spot dots */}
                          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                            {selectedWork.imageUrls.map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playClickSound();
                                  setActiveSlideIdx(i);
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  activeSlideIdx === i ? 'bg-[#9D81BB] w-3 scale-110' : 'bg-gray-400/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div 
                      onClick={() => {
                        setLightboxScale(1);
                        setLightboxPosition({ x: 0, y: 0 });
                        setIsLightboxOpen(true);
                      }}
                      className="w-full cursor-zoom-in active:scale-[0.99] transition-transform duration-300"
                    >
                      <CardIllustration type={selectedWork.illustrationSvgId} isHovered={true} imageUrl={selectedWork.imageUrl} />
                    </div>
                  )}

                  {/* Indicator info and interactive tips */}
                  <div className="mt-2.5 text-center flex flex-col gap-0.5 select-none">
                    <span className="text-[10px] text-gray-400 font-sans tracking-wide leading-snug">
           {selectedWork.imageUrls && selectedWork.imageUrls.length > 0 
             ? "💡 点击图片进入全屏细节及缩放阅览" 
             : "🔍 点击可以查看大图"}
                    </span>
                    {selectedWork.imageUrls && selectedWork.imageUrls.length > 1 && (
                      <span className="font-mono text-[9px] text-[#9D81BB]/80 tracking-wider">
                        GALLERY {activeSlideIdx + 1} / {selectedWork.imageUrls.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Color Palette Exhibition */}
                <div className="mt-6 flex flex-col items-center gap-2">
                  <span className="font-mono text-[12px] text-gray-400 tracking-wider">COLORS OF TRANQUILITY</span>
                  <div className="flex gap-1.5 p-1 px-2.5 rounded-full bg-white/70 border border-white/80 shadow-sm">
                    {selectedWork.colorPalette.map((col, i) => (
                      <div key={i} className="flex items-center gap-1 group">
                        <div 
                          className="w-3.5 h-3.5 rounded-full border border-white/80" 
                          style={{ backgroundColor: col }}
                        />
                        <span className="font-mono text-[11px] text-gray-400 hidden group-hover:inline">{col}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right-hand descriptive metadata container */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  {/* Close floating badge */}
                  <button
                    onClick={handleCloseModal}
                    onMouseEnter={handleHoverElement}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/70 border border-white/80 text-gray-400 hover:text-gray-700 hover:scale-105 transition-all select-none cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#9D81BB]/10 text-[#9D81BB] font-mono text-[12px] tracking-wider uppercase">
                      {selectedWork.category.toUpperCase() === 'IP' ? 'CHARACTER IP' : selectedWork.category.toUpperCase()}
                    </span>
                    <span className="ml-2 font-mono text-[11px] text-gray-400 tracking-widest">{selectedWork.subtitle}</span>
                  </div>

                  <h3 className="font-sans font-medium text-charcoal-900 text-2xl tracking-wide mb-4 leading-normal">
                    {selectedWork.title}
                  </h3>

                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#9D81BB]/50 to-transparent mb-5" />

                  <p className="font-sans text-sm text-gray-400 leading-relaxed font-light mb-6">
                    {selectedWork.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/50 border border-white/80 flex flex-col gap-2 shadow-sm text-sm font-sans">
                    <span className="font-medium text-charcoal-800">创作细则 / Design Specification:</span>
                    <span className="text-gray-500 font-light leading-relaxed">{selectedWork.materialDetails}</span>
                  </div>
                </div>

                {/* Healing heart footer action */}
                <div className="mt-8 pt-4 border-t border-purple-50/50 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1.5 text-gray-400 select-none">
                    <Heart className="w-4 h-4 text-rose-300 fill-rose-300 animate-pulse" />
                    <span>疗愈之作 2026</span>
                  </div>
                  <div className="flex gap-2">
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          handleCloseModal();
                          handleOpenEditModal(selectedWork);
                        }}
                        className="px-5 py-2 rounded-full border border-[#9D81BB]/50 text-[#9D81BB] hover:bg-purple-50/40 font-medium text-sm tracking-wide transition-all select-none cursor-pointer flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        编辑图集
                      </button>
                    )}
                    <button
                      onClick={handleCloseModal}
                      onMouseEnter={handleHoverElement}
                      className="px-5 py-2 rounded-full bg-[#9D81BB] hover:bg-[#9D81BB]/90 text-white font-medium text-sm tracking-wide transition-all select-none cursor-pointer shadow-sm shadow-[#9D81BB]/20"
                    >
                      静静返回
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive quiet, slow-fade upload modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-[#161224]/30 backdrop-blur-[12px] transition-all"
              onClick={() => setIsUploadOpen(false)}
            />

            {/* Frosted Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/80 backdrop-blur-2xl border border-white/70 w-full max-w-2xl rounded-[32px] shadow-[0_32px_80px_rgba(22,18,36,0.15)] relative z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => {
                  setIsUploadOpen(false);
                  setEditingWorkId(null);
                }}
                onMouseEnter={handleHoverElement}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/70 border border-white/80 text-gray-400 hover:text-gray-700 hover:scale-105 transition-all select-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE5FC]/50 border border-white/60 text-[#9D81BB] font-mono text-[11px] tracking-widest uppercase mb-2 shadow-sm">
                  <UploadCloud className="w-3.5 h-3.5" />
                  {editingWorkId ? "EDITING PORTFOLIO MASTERPIECE" : "INSPIRED CREATIVE PINNING"}
                </div>
                <h3 className="font-sans font-medium text-charcoal-900 text-xl tracking-wide mb-1">
                  {editingWorkId ? "进一步雕琢与修饰作品 ✍️" : "拼贴并载入灵感之作"}
                </h3>
                <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                  {editingWorkId 
                    ? "在此自由修改图集分类、标题文字、设计理念文案或增删组图。修改将实时应用。" 
                    : "在磨砂玻璃格栅里置入你的设计草图或创意拼贴，我们将用低饱和度的星光色温烘托它。"}
                </p>
              </div>

              <form onSubmit={handleSaveCustomWork} className="space-y-5">
                {/* Drag and Drop Uploader Widget */}
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('work-file-input')?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer select-none relative group min-h-[120px] ${
                    dragActive 
                      ? 'border-[#9D81BB] bg-[#EBE5FC]/20' 
                      : 'border-white/80 bg-white/40 hover:bg-white/70 hover:border-[#9D81BB]/50'
                  }`}
                >
                  <input 
                    type="file" 
                    id="work-file-input" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden" 
                    multiple
                  />

                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#9D81BB] group-hover:scale-105 transition-all">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="text-center space-y-0.5">
                    <p className="text-xs font-semibold text-charcoal-800">
                      拖拽多张图片到此 或 <span className="text-[#9D81BB] underline">浏览本地文件</span>
                    </p>
                    <p className="text-[10px] text-gray-400 font-light font-sans">
                      支持批量多张上传 · JPG, PNG, WEBP, GIF (优先读取首张为封面图)
                    </p>
                  </div>
                </div>

                {/* Uploaded Images Gallery Grid with hover removals */}
                {uploadedImages.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono text-gray-400 tracking-wider">
                      已载入的展示图片 / GALLERY IMAGES ({uploadedImages.length}张)
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 p-3 rounded-2xl border border-white/60 bg-white/40">
                      {uploadedImages.map((src, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden relative group border border-white bg-[#EBE5FC]/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                          <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          
                          {/* Close indicator */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playClickSound();
                              setUploadedImages(prev => prev.filter((_, i) => i !== idx));
                            }}
                            className="absolute top-1 right-1 p-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-sm transition-all scale-90 group-hover:scale-100 cursor-pointer"
                          >
                            <X className="w-2.5 h-2.5 text-white" />
                          </button>

                          {idx === 0 && (
                            <div className="absolute bottom-0 inset-x-0 bg-[#9D81BB]/90 text-[8px] text-white py-0.5 text-center font-sans tracking-wide">
                              封面首图
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category select */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-gray-400 tracking-wider">划分板块 / CATEGORY</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/60 border border-white/80 focus:border-[#9D81BB] focus:outline-none text-xs font-sans text-charcoal-850"
                    >
                      <option value="graphic">平面设计 (GRAPHIC)</option>
                      <option value="ip">IP设计 (CHARACTER IP)</option>
                      <option value="ecommerce">电商设计 (E-COMMERCE)</option>
                      <option value="modeling">建模设计 (3D MODELING)</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-gray-400 tracking-wider">设计命名 / TITLE</label>
                    <input 
                      type="text"
                      placeholder="例如：《夏夜晚星》艺术封面"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/60 border border-white/80 focus:border-[#9D81BB] focus:outline-none text-xs font-sans placeholder-gray-400 hover:border-gray-350 cursor-text"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Subtitle */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-gray-400 tracking-wider">设计副标 / SUBTITLE</label>
                    <input 
                      type="text"
                      placeholder="例如：Graphic / Poster Layout"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/60 border border-white/80 focus:border-[#9D81BB] focus:outline-none text-xs font-sans placeholder-gray-400"
                    />
                  </div>

                  {/* Specifications */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-gray-400 tracking-wider">工艺设计细节 / SPECIFICATION</label>
                    <input 
                      type="text"
                      placeholder="例如：iPad Pro (Procreate作画) / 折射磨砂"
                      value={newMaterialDetails}
                      onChange={(e) => setNewMaterialDetails(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/60 border border-white/80 focus:border-[#9D81BB] focus:outline-none text-xs font-sans placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono text-gray-400 tracking-wider">随笔与设计理念 / CONCEPT DESCRIPTION</label>
                  <textarea 
                    rows={2.5}
                    placeholder="在此倾诉您的创作心境，如「清晨窗边滴落的雨滴融入暖意色谱中……」"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/60 border border-white/80 focus:border-[#9D81BB] focus:outline-none text-xs font-sans placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Color Swatch Preset Selector */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono text-gray-400 tracking-wider">星光氛围色彩搭配 / COLOR THEME</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {COLOR_PRESETS.map((p, idx) => {
                      const isSelected = selectedPaletteIdx === idx;
                      return (
                        <div
                          key={idx}
                          type="button"
                          onClick={() => setSelectedPaletteIdx(idx)}
                          className={`p-2 rounded-xl bg-white/60 border cursor-pointer transition-all flex flex-col gap-1.5 items-center justify-center select-none ${
                            isSelected 
                              ? 'border-[#9D81BB] bg-purple-50/15 shadow-[0_2px_8px_rgba(157,129,187,0.1)] scale-[1.02]' 
                              : 'border-white/80 hover:bg-white/80'
                          }`}
                        >
                          <span className="text-[9px] font-sans text-gray-500 font-medium leading-none">{p.name}</span>
                          <div className="flex gap-1">
                            {p.colors.slice(0, 3).map((col, i) => (
                              <div key={i} className="w-2.5 h-2.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: col }} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form Footer Action */}
                <div className="pt-4 border-t border-purple-50/40 flex justify-end gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUploadOpen(false);
                      setEditingWorkId(null);
                    }}
                    className="px-5 py-2.5 rounded-full bg-white/45 hover:bg-white/80 border border-white/60 text-gray-500 font-medium font-sans select-none cursor-pointer duration-300"
                  >
                    静静取消
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#9D81BB] hover:bg-[#9D81BB]/90 text-white font-medium font-sans text-xs tracking-wider transition-all select-none cursor-pointer shadow-sm shadow-[#9D81BB]/20"
                  >
                    {editingWorkId ? "确认并完美保存 ✧" : "注入灵魂 · 载入展示"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Immersive Fullscreen Lightbox with Scale & Panning Controls */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-[#0e0b17]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-hidden select-none cursor-zoom-out"
            onClick={() => {
              playClickSound();
              setIsLightboxOpen(false);
              setLightboxScale(1);
              setLightboxPosition({ x: 0, y: 0 });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsLightboxOpen(false);
                setLightboxScale(1);
                setLightboxPosition({ x: 0, y: 0 });
              } else if (e.key === 'ArrowLeft' && selectedWork?.imageUrls && selectedWork.imageUrls.length > 1) {
                playClickSound();
                setActiveSlideIdx(prev => (prev - 1 + selectedWork.imageUrls!.length) % selectedWork.imageUrls!.length);
                setLightboxScale(1);
                setLightboxPosition({ x: 0, y: 0 });
              } else if (e.key === 'ArrowRight' && selectedWork?.imageUrls && selectedWork.imageUrls.length > 1) {
                playClickSound();
                setActiveSlideIdx(prev => (prev + 1) % selectedWork.imageUrls!.length);
                setLightboxScale(1);
                setLightboxPosition({ x: 0, y: 0 });
              }
            }}
            tabIndex={0}
          >
            {/* Ambient colorful backdrop lights */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9D81BB]/10 rounded-full filter blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B78F6]/10 rounded-full filter blur-[150px] pointer-events-none" />

            {/* Left and Right slide switch buttons */}
            {selectedWork && selectedWork.imageUrls && selectedWork.imageUrls.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                    setActiveSlideIdx(prev => (prev - 1 + selectedWork.imageUrls!.length) % selectedWork.imageUrls!.length);
                    setLightboxScale(1);
                    setLightboxPosition({ x: 0, y: 0 });
                  }}
                  className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg outline-none select-none"
                  title="上一张 (←)"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                    setActiveSlideIdx(prev => (prev + 1) % selectedWork.imageUrls!.length);
                    setLightboxScale(1);
                    setLightboxPosition({ x: 0, y: 0 });
                  }}
                  className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg outline-none select-none"
                  title="下一张 (→)"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            {/* Top Toolbar */}
            <div 
              className="absolute top-5 inset-x-0 px-6 flex justify-between items-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                <h4 className="font-sans font-medium text-white text-sm tracking-wide">
                  {selectedWork?.title}
                </h4>
                <p className="font-mono text-[9px] text-[#9C94B8] tracking-widest uppercase mt-0.5">
                  ARIA GRAPHIC STUDIO LOUPE VIEW
                </p>
              </div>

              {/* Scale Controllers */}
              <div className="flex items-center gap-1.5 p-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setLightboxScale(prev => Math.max(1, prev - 0.5));
                    if (lightboxScale - 0.5 <= 1) {
                      setLightboxPosition({ x: 0, y: 0 });
                    }
                  }}
                  disabled={lightboxScale <= 1}
                  title="缩小细节"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent duration-200 cursor-pointer text-white border-0"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs px-2 min-w-[40px] text-center text-gray-300">
                  {Math.round(lightboxScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setLightboxScale(prev => Math.min(4, prev + 0.5));
                  }}
                  disabled={lightboxScale >= 4}
                  title="放大细节"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent duration-200 cursor-pointer text-white border-0"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/20 my-auto mx-0.5" />
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setLightboxScale(1);
                    setLightboxPosition({ x: 0, y: 0 });
                  }}
                  disabled={lightboxScale === 1 && lightboxPosition.x === 0 && lightboxPosition.y === 0}
                  className="text-[10px] font-sans px-2.5 py-1 rounded-full hover:bg-white/10 duration-200 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-white border-0 bg-transparent"
                >
                  重置
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsLightboxOpen(false);
                  setLightboxScale(1);
                  setLightboxPosition({ x: 0, y: 0 });
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white hover:scale-105 transition-all cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Central Stage viewport where we execute mouse tracking zoom & pan */}
            <div 
              className="relative w-full h-[calc(100vh-140px)] flex items-center justify-center"
              onMouseMove={(e) => {
                if (!isDraggingLightbox || lightboxScale <= 1) return;
                setLightboxPosition({
                  x: e.clientX - lightboxDragStart.x,
                  y: e.clientY - lightboxDragStart.y
                });
              }}
              onMouseUp={() => setIsDraggingLightbox(false)}
              onMouseLeave={() => setIsDraggingLightbox(false)}
              onWheel={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Smooth wheel magnification
                setLightboxScale(prev => {
                  const zoomIntensity = 0.15;
                  const nextScale = prev - e.deltaY * zoomIntensity * 0.01;
                  const boundedScale = Math.min(4, Math.max(1, nextScale));
                  if (boundedScale <= 1) {
                    setLightboxPosition({ x: 0, y: 0 });
                  }
                  return boundedScale;
                });
              }}
            >
              {selectedWork && (
                <div 
                  className="relative max-w-full max-h-full transition-transform duration-75 ease"
                  style={{
                    transform: `translate(${lightboxPosition.x}px, ${lightboxPosition.y}px) scale(${lightboxScale})`,
                    cursor: lightboxScale > 1 ? (isDraggingLightbox ? 'grabbing' : 'grab') : 'zoom-in'
                  }}
                  onClick={(e) => {
                    // Prevent closing when clicking on the content card or image itself
                    e.stopPropagation();
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                    // Double click to toggle maximize scale
                    if (lightboxScale > 1.1) {
                      setLightboxScale(1);
                      setLightboxPosition({ x: 0, y: 0 });
                    } else {
                      setLightboxScale(2.5);
                    }
                  }}
                  onMouseDown={(e) => {
                    if (lightboxScale <= 1) return;
                    e.preventDefault();
                    setIsDraggingLightbox(true);
                    setLightboxDragStart({
                      x: e.clientX - lightboxPosition.x,
                      y: e.clientY - lightboxPosition.y
                    });
                  }}
                >
                  {selectedWork.imageUrls && selectedWork.imageUrls.length > 0 ? (
                    <img 
                      src={selectedWork.imageUrls[activeSlideIdx]} 
                      alt="Enlarged detailed showcase" 
                      referrerPolicy="no-referrer"
                      className="max-h-[75vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-white/10 select-none pointer-events-none"
                    />
                  ) : (
                    /* Preset illustrations rendered beautifully in custom aspect container */
                    <div className="w-80 sm:w-96 p-6 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/10 flex items-center justify-center select-none aspect-square">
                      <CardIllustration type={selectedWork.illustrationSvgId} isHovered={true} imageUrl={selectedWork.imageUrl} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Floating Tips Bar */}
            <div className="absolute bottom-6 flex flex-col items-center gap-1.5 pointer-events-none select-none">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg text-[10px] text-gray-300 font-sans"
              >
                {lightboxScale > 1 ? (
                  <>
                    <Move className="w-3.5 h-3.5 text-[#9D81BB] animate-bounce" />
                    <span>按住鼠标左键可任意拖拽 · 鼠标滚轮进一步缩放 · 双击还原</span>
                  </>
                ) : (
                  <>
                    <span>💡 双击图像放大 · 鼠标滚轮缩放细节 · 点击图像周围空白任意区域可直接返回</span>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Deleted Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-[#0e0b17]/95 backdrop-blur-md border border-white/10 text-white shadow-2xl flex items-center gap-3 font-sans text-xs select-none max-w-sm"
          >
            <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-mono">
              ✕
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-100">{toastMessage}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-light">您可在左侧「设计类目」下方大纲随时还原</p>
            </div>
            {deletedWorks.length > 0 && deletedWorks[0] && (
              <button
                type="button"
                onClick={() => {
                  setToastMessage(null);
                  handleRestoreWork(deletedWorks[0].id);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans text-[10px] duration-150 cursor-pointer font-medium border-0"
              >
                撤销
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
