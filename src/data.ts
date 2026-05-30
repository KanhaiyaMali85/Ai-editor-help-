/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tool, TaskRecommendation, LanguagePack } from './types';

export const TOOLS: Tool[] = [
  {
    id: 'premiere-pro',
    name: 'Adobe Premiere Pro',
    category: 'video',
    description: {
      en: 'Industry-standard professional video editing software equipped with advanced Adobe Sensei AI tools for automated workflows.',
      hi: 'ऑटोमेटेड वर्कफ़्लो के लिए उन्नत एडोब सेंसई एआई टूल्स से लैस उद्योग-मानक पेशेवर वीडियो एडिटिंग सॉफ्टवेयर।'
    },
    mainFeatures: {
      en: ['Auto Reframe for multiple aspects', 'AI Speech-to-Text captioning', 'Optical Flow speed adjustments', 'Scene Edit Detection'],
      hi: ['मल्टीपल एस्पेक्ट्स के लिए ऑटो रीफ्रेम', 'एआई स्पीच-टू-टेक्स्ट कैप्शनिंग', 'ऑप्टिकल फ्लो स्पीड एडजस्टमेंट', 'सीन एडिट डिटेक्शन']
    },
    bestUseCases: {
      en: ['YouTube Videos', 'Reels & TikToks', 'Commercial Advertisement Projects', 'Cinematic Films'],
      hi: ['यूट्यूब वीडियो', 'रील्स और टिकटॉक', 'कमर्शियल एडवरटाइजमेंट प्रोजेक्ट्स', 'सिनेमैटिक फिल्में']
    },
    skillLevel: 'Professional',
    pricing: {
      type: 'Paid',
      desc: {
        en: 'Subscription based with a free trial.',
        hi: 'फ्री ट्रायल के साथ सब्सक्रिप्शन आधारित।'
      },
      cost: '$22.99/mo'
    },
    easeOfUse: {
      text: {
        en: 'Steep learning curve but extremely powerful customizable workspace.',
        hi: 'सीखना कठिन है लेकिन बेहद शक्तिशाली और कस्टमाइज़ करने योग्य वर्कस्पेस है।'
      },
      rating: 3
    },
    aiCapabilities: {
      text: {
        en: 'Advanced workflow AI including automated transcriptions, audio dipping, and intelligent color matching.',
        hi: 'स्वचालित ट्रांसक्रिप्शन, ऑडियो डिपिंग और इंटेलिजेंट कलर मैचिंग सहित उन्नत वर्कफ़्लो एआई।'
      },
      rating: 4
    },
    aiFeaturesList: {
      en: ['Auto Reframe', 'Speech-to-Text Transcripts', 'Scene Edit Detection', 'Enhance Speech', 'Color Match'],
      hi: ['ऑटो रीफ्रेम', 'स्पीच-टू-टेक्स्ट ट्रांसक्रिप्शन', 'सीन एडिट डिटेक्शन', 'एन्हांस स्पीच', 'कलर मैच']
    },
    rating: 4.8,
    iconName: 'Video',
    colorClass: 'emerald'
  },
  {
    id: 'capcut',
    name: 'CapCut',
    category: 'video',
    description: {
      en: 'A highly accessible, feature-rich editor that uses AI to automate trending video enhancements and templates.',
      hi: 'एक अत्यधिक सुलभ, फीचर-समृद्ध एडिटर जो ट्रेंडिंग वीडियो एन्हांसमेंट और टेम्पलेट को स्वचालित करने के लिए एआई का उपयोग करता है।'
    },
    mainFeatures: {
      en: ['One-click background removal', 'Auto captions & subtitle generator', 'AI stylized portrait effects', 'Smart voice changer'],
      hi: ['वन-क्लिक बैकग्राउंड रिमूवल', 'ऑटो कैप्शन और सबटाइटल जनरेटर', 'एआई स्टाइल वाले पोर्ट्रेट प्रभाव', 'स्मार्ट वॉयस चेंजर']
    },
    bestUseCases: {
      en: ['Social media Reels', 'Short TikTok promos', 'Quick video cuts', 'Mobile video creations'],
      hi: ['सोशल मीडिया रील्स', 'शॉर्ट टिकटॉक प्रोमो', 'क्विक वीडियो कट्स', 'मोबाइल वीडियो निर्माण']
    },
    skillLevel: 'Beginner',
    pricing: {
      type: 'Freemium',
      desc: {
        en: 'Free basic plan with premium filters and clouds.',
        hi: 'प्रीमियम फिल्टर और क्लाउड के साथ मुफ्त बुनियादी योजना।'
      },
      cost: 'Free / $7.99/mo'
    },
    easeOfUse: {
      text: {
        en: 'Drag-and-drop workflow optimized for mobile and desktop creators.',
        hi: 'मोबाइल और डेस्कटॉप रचनाकारों के लिए अनुकूलित ड्रैग-एंड-ड्रॉप वर्कफ़्लो।'
      },
      rating: 5
    },
    aiCapabilities: {
      text: {
        en: 'Excellent cloud-based consumer AI features for instant visual results.',
        hi: 'त्वरित विज़ुअल परिणामों के लिए उत्कृष्ट क्लाउड-आधारित उपभोक्ता एआई विशेषताएं।'
      },
      rating: 4
    },
    aiFeaturesList: {
      en: ['Auto Subtitles', 'Background Removal', 'AI Body Effects', 'AI Voice Duplication'],
      hi: ['ऑटो सबटाइटल्स', 'बैकग्राउंड रिमूवल', 'एआई बॉडी इफेक्ट्स', 'एआई वॉयस डुप्लीकेशन']
    },
    rating: 4.6,
    iconName: 'Smartphone',
    colorClass: 'cyan'
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'photo',
    description: {
      en: 'The industry-standard image editing suite integrated with Adobe Firefly generative AI for limitless canvas extensions and replacements.',
      hi: 'असीमित कैनवास विस्तार और रिप्लेसमेंट के लिए एडोब फायरफ्लाई जनरेटिव एआई के साथ एकीकृत उद्योग-मानक इमेज एडिटिंग सूट।'
    },
    mainFeatures: {
      en: ['Generative Fill (expand/add objects)', 'Generative Expand (modify borders)', 'Intelligent subject selection', 'Neurofilters for restoration'],
      hi: ['जनरेटिव फिल (इमेज में ऑब्जेक्ट जोड़ना)', 'जनरेटिव एक्सपैंड (कैनवास बढ़ाना)', 'इंटेलिजेंट सब्जेक्ट सिलेक्शन', 'रिस्टोरेशन के लिए न्यूरोफिल्टर्स']
    },
    bestUseCases: {
      en: ['Graphic Compositions', 'Photo Restoration', 'Generative Art creation', 'Hi-Res Commercial Design'],
      hi: ['ग्राफिक कंपोज़िशन', 'फोटो रिस्टोरेशन', 'जनरेटिव आर्ट क्रिएशन', 'हाई-रेस कमर्शियल डिज़ाइन']
    },
    skillLevel: 'Professional',
    pricing: {
      type: 'Paid',
      desc: {
        en: 'Paid subscription, part of Creative Cloud ecosystem.',
        hi: 'सशुल्क सब्सक्रिप्शन, क्रिएटिव क्लाउड इकोसिस्टम का हिस्सा।'
      },
      cost: '$22.99/mo'
    },
    easeOfUse: {
      text: {
        en: 'Professional interface with numerous panels, requiring tutorials to master.',
        hi: 'अनेक पैनलों के साथ पेशेवर इंटरफ़ेस, जिसे सीखने के लिए ट्यूटोरियल की आवश्यकता होती है।'
      },
      rating: 2
    },
    aiCapabilities: {
      text: {
        en: 'Top-tier generative AI filled with advanced context-matching and resolution rendering.',
        hi: 'उन्नत संदर्भ-मिलान और रिज़ॉल्यूशन रेंडरिंग से भरा शीर्ष-स्तरीय जनरेटिव एआई।'
      },
      rating: 5
    },
    aiFeaturesList: {
      en: ['Generative Fill', 'Generative Expand', 'Context Aware Cleanup', 'Neural Filters', 'Sky Replacement'],
      hi: ['जनरेटिव फिल', 'जनरेटिव एक्सपैंड', 'कॉन्टेक्स्ट अवेयर क्लीनअप', 'न्यूरल फिल्टर्स', 'स्काई रिप्लेसमेंट']
    },
    rating: 4.9,
    iconName: 'Image',
    colorClass: 'blue'
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'design',
    description: {
      en: 'An all-in-one graphic design platform built for fast, collaborative creations with highly advanced AI automation.',
      hi: 'अत्यधिक उन्नत एआई स्वचालन के साथ तेज़, सहयोगी रचनाओं के लिए बनाया गया एक ऑल-इन-वन ग्राफिक डिज़ाइन प्लेटफ़ॉर्म।'
    },
    mainFeatures: {
      en: ['Magic Write (AI copywriter editor)', 'Magic Design templates', 'One-click AI eraser & background remover', 'AI Text to Image converter'],
      hi: ['मैजिक राइट (एआई कॉपीराइटर एडिटर)', 'मैजिक डिज़ाइन टेम्पलेट्स', 'वन-क्लिक एआई इरेज़र और बैकग्राउंड रिमूवर', 'एआई टेक्स्ट टू इमेज कनवर्टर']
    },
    bestUseCases: {
      en: ['Social media posts', 'Pitch presentations', 'Flyers & Brand kits', 'YouTube thumbnails'],
      hi: ['सोशल मीडिया पोस्ट', 'पिच प्रेजेंटेशन', 'फ्लोयर्स और ब्रांड किट्स', 'यूट्यूब थंबनेल']
    },
    skillLevel: 'Beginner',
    pricing: {
      type: 'Freemium',
      desc: {
        en: 'Very generous free plan with premium templates and assets in Pro.',
        hi: 'प्रो में प्रीमियम टेम्पलेट्स और संपत्तियों के साथ बहुत उदार मुफ्त योजना।'
      },
      cost: 'Free / $12.99/mo'
    },
    easeOfUse: {
      text: {
        en: 'Super intuitive, cloud-based platform that requires virtually zero experience.',
        hi: 'अत्यंत सहज, क्लाउड-आधारित प्लेटफ़ॉर्म जिसके लिए लगभग शून्य अनुभव की आवश्यकता होती है।'
      },
      rating: 5
    },
    aiCapabilities: {
      text: {
        en: 'Practical template-focused AI toolsets built to speed up presentation and post assembly.',
        hi: 'प्रेजेंटेशन और पोस्ट असेंबली को गति देने के लिए बनाए गए व्यावहारिक टेम्पलेट-केंद्रित एआई टूलसेट।'
      },
      rating: 4
    },
    aiFeaturesList: {
      en: ['Magic Eraser', 'Magic Design', 'Text to Graphic', 'AI Translation', 'Beat Sync'],
      hi: ['मैजिक इरेज़र', 'मैजिक डिज़ाइन', 'टेक्स्ट टू ग्राफिक', 'एआई ट्रांसलेशन', 'बीट सिंक']
    },
    rating: 4.7,
    iconName: 'Palette',
    colorClass: 'purple'
  },
  {
    id: 'davinci-resolve',
    name: 'DaVinci Resolve',
    category: 'video',
    description: {
      en: 'A powerhouse software famous for mastercolor grading, now supercharged by the DaVinci Neural Engine AI.',
      hi: 'मास्टर कलर ग्रेडिंग के लिए प्रसिद्ध एक पावरहाउस सॉफ्टवेयर, जो अब डाविंची न्यूरल इंजन एआई द्वारा सुपरचार्ज्ड है।'
    },
    mainFeatures: {
      en: ['AI Auto Color Balancing', 'AI Face Tracking & refinement tools', 'Smart Reframe & isolation', 'Voice Isolation and cleanup'],
      hi: ['एआई ऑटो कलर बैलेंसिंग', 'एआई फेस ट्रैकिंग और रिफाइनमेंट टूल्स', 'स्मार्ट रीफ्रेम और आइसोलेशन', 'वॉइस आइसोलेशन और क्लीनअप']
    },
    bestUseCases: {
      en: ['High-level film grading', 'YouTube tech videos', 'Multi-camera studio cuts', 'Sound design and mix'],
      hi: ['उच्च स्तरीय फिल्म कलर ग्रेडिंग', 'यूट्यूब टेक वीडियो', 'मल्टी-कैमरा स्टूडियो कट्स', 'साउंड डिजाइन और मिक्स']
    },
    skillLevel: 'Professional',
    pricing: {
      type: 'Freemium',
      desc: {
        en: 'Extremely powerful free version; one-time fee for Studio version.',
        hi: 'बेहद शक्तिशाली मुफ्त संस्करण; स्टूडियो संस्करण के लिए एक बार का शुल्क।'
      },
      cost: 'Free / $295 One-time'
    },
    easeOfUse: {
      text: {
        en: 'Node-based layout which takes substantial time to learn but offers unmatched control.',
        hi: 'नोड-आधारित लेआउट जिसे सीखने में काफी समय लगता है लेकिन बेजोड़ नियंत्रण प्रदान करता है।'
      },
      rating: 2
    },
    aiCapabilities: {
      text: {
        en: 'State-of-the-art neural engine targeting depth estimation, voice isolation and facial geometry tracking.',
        hi: 'डेप्थ एस्टीमेशन, वॉयस आइसोलेशन और फेशियल जियोमेट्री ट्रैकिंग को लक्षित करने वाला अत्याधुनिक न्यूरल इंजन।'
      },
      rating: 5
    },
    aiFeaturesList: {
      en: ['DaVinci Neural Engine', 'AI Voice Isolation', 'Smart Reframe', 'Magic Mask', 'AI Depth Map'],
      hi: ['डाविंची न्यूरल इंजन', 'एआई वॉइस आइसोलेशन', 'स्मार्ट रीफ्रेम', 'मैजिक मास्क', 'एआई डेप्थ मैप']
    },
    rating: 4.9,
    iconName: 'Sliders',
    colorClass: 'indigo'
  },
  {
    id: 'descript',
    name: 'Descript',
    category: 'audio',
    description: {
      en: 'A revolutionary text-based audio and video editor. Edit your recordings by editing the generated transcript.',
      hi: 'एक क्रांतिकारी टेक्स्ट-आधारित ऑडियो और वीडियो एडिटर। उत्पन्न ट्रांसक्रिप्ट को एडिट करके अपनी रिकॉर्डिंग को एडिट करें।'
    },
    mainFeatures: {
      en: ['AI Voice Overdub (cloning)', 'One-click filler word removal (uh/um)', 'Studio Sound voice cleanup', 'Automated rapid transcripts'],
      hi: ['एआई वॉयस ओवरडब (क्लोनिंग)', 'वन-क्लिक फिलर वर्ड्स रिमूवल (उह/उम)', 'स्टूडियो साउंड वॉयस क्लीनअप', 'स्वचालित रैपिड ट्रांसक्रिप्ट']
    },
    bestUseCases: {
      en: ['Podcast assembly', 'Interviews walkthrough', 'Faceless narration videos', 'Online training courses'],
      hi: ['पॉडकास्ट असेंबली', 'इंटरव्यू वॉकथ्रू', 'फेसलेस नरेशन वीडियो', 'ऑनलाइन ट्रेनिंग कोर्सेज']
    },
    skillLevel: 'Intermediate',
    pricing: {
      type: 'Freemium',
      desc: {
        en: 'Free hours of transcription per month, tiered pricing for teams.',
        hi: 'प्रति माह ट्रांसक्रिप्शन के मुफ्त घंटे, टीमों के लिए स्तरीय मूल्य निर्धारण।'
      },
      cost: 'Free / $12.00/mo'
    },
    easeOfUse: {
      text: {
        en: 'A highly functional word-processor workflow makes it accessible to beginners in minutes.',
        hi: 'एक अत्यधिक कार्यात्मक वर्ड-प्रोसेसर वर्कफ़्लो इसे मिनटों में शुरुआती लोगों के लिए सुलभ बनाता है।'
      },
      rating: 4
    },
    aiCapabilities: {
      text: {
        en: 'Excellent transcription models, synthetic speech and smart sound engineering algorithms.',
        hi: 'उत्कृष्ट ट्रांसक्रिप्शन मॉडल, सिंथेटिक भाषण और स्मार्ट ध्वनि इंजीनियरिंग एल्गोरिदम।'
      },
      rating: 5
    },
    aiFeaturesList: {
      en: ['Text-to-Edit Video', 'Studio Sound Enhancer', 'Filler Word Removal', 'Overdub Voice Clone'],
      hi: ['टेक्स्ट-टू-एडिट वीडियो', 'स्टूडियो साउंड एन्हांसर', 'फिलर वर्ड रिमूवल', 'ओवरडब वॉयस क्लोन']
    },
    rating: 4.7,
    iconName: 'Mic',
    colorClass: 'pink'
  },
  {
    id: 'runway',
    name: 'Runway',
    category: 'content',
    description: {
      en: 'An immersive creative laboratory pioneering generative AI and video synthesis models for filmmakers and artists.',
      hi: 'फिल्म निर्माताओं और कलाकारों के लिए जनरेटिव एआई और वीडियो संश्लेषण मॉडल की खोज करने वाली एक रचनात्मक प्रयोगशाला।'
    },
    mainFeatures: {
      en: ['Gen-2 & Gen-3 text-to-video editing', 'AI object removal in motion (Inpainting)', 'Super-slow motion synthesizer', 'Frame interpolation & depth generator'],
      hi: ['जेन-2 और जेन-3 टेक्स्ट-टू-वीडियो एडिटिंग', 'मोशन में एआई ऑब्जेक्ट रिमूवल (इनपेंटिंग)', 'सुपर-स्लो मोशन सिंथेसाइज़र', 'फ्रेम इंटरपोलेशन और डेप्थ जनरेटर']
    },
    bestUseCases: {
      en: ['Sci-fi concepts', 'VFX heavy compositions', 'Generative B-rolls', 'Experimental art direction'],
      hi: ['साइंस-फिक्शन कॉन्सेप्ट्स', 'वीएफएक्स हैवी कंपोज़िशन', 'जनरेटिव बी-रोल्स', 'प्रायोगिक कला निर्देशन']
    },
    skillLevel: 'Intermediate',
    pricing: {
      type: 'Freemium',
      desc: {
        en: 'Free tier with restricted assets, credits-based generation in Pro.',
        hi: 'प्रतिबंधित संपत्तियों के साथ मुफ्त स्तर, प्रो में क्रेडिट-आधारित पीढ़ी।'
      },
      cost: 'Free / $15.00/mo'
    },
    easeOfUse: {
      text: {
        en: 'Innovative but sandbox dashboard that requires experimenting with text prompts.',
        hi: 'अभिनव लेकिन सैंडबॉक्स डैशबोर्ड जिसमें टेक्स्ट प्रॉम्प्ट के साथ प्रयोग करने की आवश्यकता होती।'
      },
      rating: 3.5
    },
    aiCapabilities: {
      text: {
        en: 'Cutting-edge physics-simulation video generators and motion tracking models.',
        hi: 'अत्याधुनिक भौतिकी-सिमुलेशन वीडियो जनरेटर और मोशन ट्रैकिंग मॉडल।'
      },
      rating: 5
    },
    aiFeaturesList: {
      en: ['Text to Video (Gen-3)', 'AI Inpainting', 'Motion Brush', 'Text to 3D Texture', 'Green Screen Tool'],
      hi: ['टेक्स्ट टू वीडियो (Gen-3)', 'एआई इनपेंटिंग', 'मोशन ब्रश', 'टेक्स्ट टू 3डी टेक्सचर', 'ग्रीन स्क्रीन टूल']
    },
    rating: 4.8,
    iconName: 'Sparkles',
    colorClass: 'violet'
  },
  {
    id: 'photoroom',
    name: 'Photoroom',
    category: 'photo',
    description: {
      en: 'An AI-first photo editor designed for e-commerce, product showcases, and fast studio-quality background swapping.',
      hi: 'ई-कॉमर्स, प्रोडक्ट शोकेस और तेजी से स्टूडिओ-क्वालिटी बैकग्राउंड बदलने के लिए डिज़ाइन किया गया एक एआई-फर्स्ट फोटो एडिटर।'
    },
    mainFeatures: {
      en: ['Instant solid background removal', 'AI product shadow blending', 'AI Batch editing capabilities', 'HD image upscaling'],
      hi: ['इंस्टेंट सॉलिड बैकग्राउंड रिमूवल', 'एआई प्रोडक्ट शैडो ब्लेंडिंग', 'एआई बैच एडिटिंग क्षमताएं', 'एचडी इमेज अपस्केलिंग']
    },
    bestUseCases: {
      en: ['Product photos', 'E-commerce listings', 'Profile avatars', 'Re-selling platforms'],
      hi: ['प्रोडक्ट फोटोज', 'ई-कॉमर्स लिस्टिंग', 'प्रोफाइल अवतार', 'री-सेलिंग प्लेटफॉर्म']
    },
    skillLevel: 'Beginner',
    pricing: {
      type: 'Freemium',
      desc: {
        en: 'Free downloads with credit limits, paid gets high-res batching.',
        hi: 'क्रेडिट सीमा के साथ मुफ्त डाउनलोड, सशुल्क में हाई-रेस बैचिंग मिलती है।'
      },
      cost: 'Free / $9.99/mo'
    },
    easeOfUse: {
      text: {
        en: 'Ultra-fast tap with smart bounding boxes, perfect for mobile sellers.',
        hi: 'स्मार्ट बाउंडिंग बॉक्स के साथ बेहद तेज टैप, मोबाइल विक्रेताओं के लिए एकदम सही।'
      },
      rating: 5
    },
    aiCapabilities: {
      text: {
        en: 'Incredibly precise mask outlines and background shadows creation in seconds.',
        hi: 'सेकंडों में अविश्वसनीय रूप से सटीक मास्क रूपरेखा और पृष्ठभूमि छाया निर्माण।'
      },
      rating: 4
    },
    aiFeaturesList: {
      en: ['Instant Cutout', 'AI Backgrounds', 'Batch Mode', 'AI Retouch', 'Smart Resizer'],
      hi: ['इंस्टेंट कटआउट', 'एआई बैकग्राउंड्स', 'बैच मोड', 'एआई रीटच', 'स्मार्ट रिसाइज़र']
    },
    rating: 4.5,
    iconName: 'Camera',
    colorClass: 'amber'
  }
];

export const TASKS: TaskRecommendation[] = [
  {
    id: 'remove-bg',
    name: {
      en: 'Remove Background',
      hi: 'बैकग्राउंड हटाएं'
    },
    description: {
      en: 'Instantly cut out subjects from images or videos while preserving hair and dynamic edges.',
      hi: 'बालों और गतिशील किनारों को सुरक्षित रखते हुए इमेज या वीडियो से सब्जेक्ट को तुरंत काटें।'
    },
    bestToolId: 'capcut',
    alternativeToolIds: ['photoshop', 'photoroom'],
    steps: {
      en: [
        'Import your media into the selected tool workspace.',
        'Navigate to the AI Cutout or Remove BG panel.',
        'Select "Auto Removal" and let the AI process the context outlines.',
        'Use the refine brush for intricate edges such as hair or accessories if needed.',
        'Export as transparent PNG or apply a stylized virtual background.'
      ],
      hi: [
        'अपने मीडिया को चुने गए टूल वर्कस्पेस में इम्पोर्ट करें।',
        'एआई कटआउट या रिमूव बीजी (Remove BG) पैनल पर नेविगेट करें।',
        '"ऑटो रिमूवल" चुनें और एआई को विवरण को पहचानने दें।',
        'यदि आवश्यक हो तो बारीक किनारों जैसे बाल या सामान के लिए रिफाइन ब्रश का उपयोग करें।',
        'ट्रांसपेरेंट पीएनजी (PNG) के रूप में एक्सपोर्ट करें या स्टाइल वाला नया बैकग्राउंड लगाएं।'
      ]
    },
    pros: {
      en: ['No complex masking manually', 'Takes seconds instead of hours', 'Maintains consistent details'],
      hi: ['मैन्युअल रूप से कोई जटिल मास्किंग नहीं', 'घंटों के बजाय सेकंड लगते हैं', 'समान विवरण बनाए रखता है']
    }
  },
  {
    id: 'generate-subtitles',
    name: {
      en: 'Generate Subtitles',
      hi: 'सबटाइटल्स बनाएं'
    },
    description: {
      en: 'Transcribe audio tracks into high-fidelity captions with automated timing synchronized perfectly.',
      hi: 'पूर्ण रूप से सिंक किए गए स्वचालित समय के साथ ऑडियो ट्रैक को उच्च-गुणवत्ता वाले सबटाइटल्स में बदलें।'
    },
    bestToolId: 'descript',
    alternativeToolIds: ['capcut', 'premiere-pro'],
    steps: {
      en: [
        'Upload your speech or active video file.',
        'Choose transcription language and select multi-speaker detection if applicable.',
        'Generate transcription using AI models.',
        'Correct minor spelling of names on the generated timeline document.',
        'Apply customized, highly readable dynamic styling templates (e.g., dynamic highlight texts).'
      ],
      hi: [
        'अपनी आवाज या सक्रिय वीडियो फ़ाइल अपलोड करें।',
        'ट्रांसक्रिप्शन भाषा चुनें और मल्टी-स्पीकर डिटेक्शन का चयन करें।',
        'एआई मॉडल का उपयोग करके ट्रांसक्रिप्शन जनरेट करें।',
        'जनरेट की गई टाइमलाइन रिपोर्ट पर नामों की छोटी-मोटी वर्तनी को ठीक करें।',
        'कस्टमाइज़्ड, अत्यधिक पठनीय गतिशील स्टाइलिंग टेम्पलेट्स (जैसे कांपते या चमकते शब्द) लागू करें।'
      ]
    },
    pros: {
      en: ['Transcription accuracy up to 98%', 'Dynamic visual templates available', 'Easy direct text timeline correction'],
      hi: ['98% तक ट्रांसक्रिप्शन सटीकता', 'डायनामिक विज़ुअल टेम्पलेट्स उपलब्ध', 'आसान सीधा टेक्स्ट टाइमलाइन सुधार']
    }
  },
  {
    id: 'color-grading',
    name: {
      en: 'Color Grading',
      hi: 'कलर ग्रेडिंग'
    },
    description: {
      en: 'Apply cinema-grade colors and matching tones using neural balance layers.',
      hi: 'न्यूरल बैलेंस लेयर्स का उपयोग करके सिनेमा-ग्रेड रंग और मैचिंग टोन लागू करें।'
    },
    bestToolId: 'davinci-resolve',
    alternativeToolIds: ['premiere-pro', 'capcut'],
    steps: {
      en: [
        'Open your timeline clips inside the editor workspace.',
        'Activate the AI Color Balance or matching panel.',
        'Select a reference frame representing your desired tone gradient.',
        'Confirm automatic target match mapping to equalise high exposure ranges.',
        'Fine-tune color strengths and export your project.'
      ],
      hi: [
        'एडिटर वर्कस्पेस के अंदर अपने टाइमलाइन क्लिप्स खोलें।',
        'एआई कलर बैलेंस या मैचिंग पैनल को सक्रिय करें।',
        'अपने वांछित टोन ग्रेडिएंट का प्रतिनिधित्व करने वाला एक संदर्भ फ्रेम चुनें।',
        'हाई एक्सपोज़र रेंज को बराबर करने के लिए स्वचालित लक्ष्य मैच मैपिंग की पुष्टि करें।',
        'रंगों की तीव्रता को ठीक करें और अपने प्रोजेक्ट को एक्सपोर्ट करें।'
      ]
    },
    pros: {
      en: ['Consistently matches multi-cam colors', 'Quick cinematic color curves', 'Automated skin tone protection'],
      hi: ['कंसिस्टेंट मल्टी-कैम रंगों से मेल खाता है', 'क्विक सिनेमैटिक कलर वेव्स', 'कीमती स्किन टोन सुरक्षा']
    }
  },
  {
    id: 'voice-cleanup',
    name: {
      en: 'Voice Cleanup',
      hi: 'आवाज साफ करें'
    },
    description: {
      en: 'Isolate spoken words and purge background air conditioner, echo, and microphone humming instantly.',
      hi: 'प्रवचन शब्दों को अलग करें और बैकग्राउंड एयर कंडीशनर, गूंज और माइक्रोफ़ोन गुनगुनाहट को तुरंत हटा दें।'
    },
    bestToolId: 'descript',
    alternativeToolIds: ['davinci-resolve', 'premiere-pro'],
    steps: {
      en: [
        'Import raw voice recording or video clips with narration.',
        'Locate the audio effects tab and choose "Studio Sound" or "Voice Isolation".',
        'Enable the slider to adjust cleanup strength (80-90% is typically recommended as natural).',
        'Let the AI filter low frequency ambient rumblings and echoes.',
        'Play back to verify crystal clear delivery and download.'
      ],
      hi: [
        'कच्ची आवाज रिकॉर्डिंग या नरेशन वाले वीडियो क्लिप को इम्पोर्ट करें।',
        'ऑडियो इफ़ेक्ट टैब खोजें और "स्टूडियो साउंड" या "वॉइस आइसोलेशन" चुनें।',
        'क्लीनअप स्ट्रेंथ को एडजस्ट करने के लिए स्लाइडर चालू करें (80-90% आमतौर पर प्राकृतिक माना जाता है)।',
        'एआई को कम आवृत्ति वाले शोर और गूंज को फिल्टर करने दें।',
        'स्पष्ट आवाज की पुष्टि करने के लिए प्लेबैक करें और डाउनलोड करें।'
      ]
    },
    pros: {
      en: ['Turns cheap mic into studio-grade gear', 'Saves endless equalizer tweaking', 'Completely removes echoes'],
      hi: ['सस्ते माइक को स्टूडियो-ग्रेड गियर में बदलता है', 'अंतहीन इक्वलाइज़र सेटिंग्स को ट्यून करने से बचाता है', 'गूंज को पूरी तरह से हटाता है']
    }
  },
  {
    id: 'thumbnail-design',
    name: {
      en: 'Thumbnail Design',
      hi: 'थंबनेल डिज़ाइन'
    },
    description: {
      en: 'Build striking, high-clickrate thumbnails using generative composition and layout formulas.',
      hi: 'जनरेटिव कॉम्पोज़िशन और लेआउट फॉर्मूलों का उपयोग करके आकर्षक और उच्च-क्लिकरेट थंबनेल बनाएं।'
    },
    bestToolId: 'canva',
    alternativeToolIds: ['photoshop', 'photoroom'],
    steps: {
      en: [
        'State your video niche inside the active text input box.',
        'Choose "Magic Design" to fetch 10 custom themed thumbnail designs.',
        'Replace standard models with your cutout face portrait.',
        'Apply AI Contrast enhancers to make text pop against darker fields.',
        'Download your high-resolution thumbnail in PNG format.'
      ],
      hi: [
        'सक्रिय टेक्स्ट इनपुट बॉक्स के अंदर अपने वीडियो का मुख्य विषय लिखें।',
        '10 कस्टम थंबनेल डिज़ाइन प्राप्त करने के लिए "मैजिक डिज़ाइन" चुनें।',
        'मानक मॉडलों को अपने चेहरे के पोर्ट्रेट कटआउट से बदलें।',
        'डार्क बैकग्राउंड पर टेक्स्ट को चमकाने के लिए एआई कंट्रास्ट एन्हांसर्स लागू करें।',
        'पीएनजी (PNG) प्रारूप में अपना उच्च-रिज़ॉल्यूशन थंबनेल डाउनलोड करें।'
      ]
    },
    pros: {
      en: ['Ready-made layout structures', 'Instant high contrast configurations', 'Tuned for click-through rates'],
      hi: ['बने-बनाए सुंदर लेआउट ढांचे', 'त्वरित उच्च कंट्रास्ट सेटिंग्स', 'क्लिक-थ्रू दरों के लिए ट्यून किया गया']
    }
  },
  {
    id: 'image-upscale',
    name: {
      en: 'Image Upscaling',
      hi: 'छवि का आकार बढ़ाएं'
    },
    description: {
      en: 'Magnify low-res snapshots up to 4K resolution using generative pixel reconstruction details.',
      hi: 'एआई पिक्सेल पुनर्निर्माण विवरण का उपयोग करके कम रिज़ॉल्यूशन के चित्रों को 4K रिज़ॉल्यूशन तक बढ़ाएं।'
    },
    bestToolId: 'photoshop',
    alternativeToolIds: ['photoroom', 'runway'],
    steps: {
      en: [
        'Drag your small pixelated image into the canvas upscaler area.',
        'Choose the upscale multiplier ratio (2x, 4x, or 8x density).',
        'Enable AI Details Enhancement to redraw pixel segments.',
        'Verify sharpening scales and natural textures (especially skin or landscape fields).',
        'Download the restored crystal clear high-res file.'
      ],
      hi: [
        'अपनी छोटी पिक्सलेटेड छवि को अपस्केलर एरिया में ड्रैग करें।',
        'अपस्केल मल्टीप्लायर अनुपात (2x, 4x, या 8x घनत्व) चुनें।',
        'पिक्सेल सेगमेंट को फिर से बनाने के लिए एआई विवरण संवर्धन सक्षम करें।',
        'शार्पनेस और प्राकृतिक बनावट (विशेष रूप से त्वचा या परिदृश्य) को सत्यापित करें।',
        'पुनर्स्थापित और बिल्कुल स्पष्ट उच्च-रिज़ॉल्यूशन फ़ाइल डाउनलोड करें।'
      ]
    },
    pros: {
      en: ['Reconstructs actual lost pixel details', 'Removes annoying blur or artifacts', 'Perfect for large posters or screens'],
      hi: ['खोए हुए वास्तविक पिक्सेल विवरण का पुनर्निर्माण करता है', 'धुंधलेपन और कलाकृतियों को हटाता है', 'बड़े पोस्टरों या स्क्रीनों के लिए बिल्कुल सही']
    }
  }
];

export const LANGUAGES: { en: LanguagePack; hi: LanguagePack } = {
  en: {
    appName: 'AI Editor Tools Guide',
    subtitle: 'The Ultimate AI Toolbox for Creators',
    searchPlaceholder: 'Search AI tools, features, or workflows...',
    allCategories: 'All Tools',
    categories: {
      video: 'Video Editing',
      photo: 'Photo Editing',
      design: 'Graphic Design',
      audio: 'Audio Editing',
      content: 'Content Creation',
      social: 'Social Media'
    },
    tabs: {
      directory: 'Tools Directory',
      recommendation: 'Smart Recs',
      comparison: 'Compare-O-Meter',
      learn: 'Skills Index'
    },
    filters: {
      skillLevel: 'Skill Level',
      pricing: 'Pricing model',
      all: 'Show All',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      professional: 'Professional',
      free: 'Free Only',
      freemium: 'Freemium',
      paid: 'Premium Paid'
    },
    toolCard: {
      keyFeatures: 'Key Features',
      bestFor: 'Best Suited For',
      aiSuperpowers: 'AI Superpowers',
      skill: 'Skill Target',
      pricing: 'Pricing',
      ease: 'Ease Of Use',
      aiPower: 'AI Capabilities',
      compareBtn: 'Add to Compare',
      removeCompare: 'In Comparison'
    },
    recommendation: {
      title: 'Smart AI Assist',
      subtitle: 'Select any active task below and we will automatically find the ultimate tools for your project workflow.',
      selectTask: 'Choose your desired task:',
      recommendedCombo: 'Recommended Production Workflow',
      bestChoice: 'Best Choice Overall',
      alternatives: 'Alternative Options To Consider',
      howToApply: 'Step-by-Step AI Guide',
      prosTitle: 'Key Advantages'
    },
    comparison: {
      title: 'Side-by-Side Comparison',
      subtitle: 'Compare pricing, ease rating, capabilities, and superpowers of two AI tools instantly.',
      searchToCompare: 'Select tool to compare...',
      selectPrompt: 'Select two tools to see a deep comparison matrix.',
      statGeneral: 'General Overview',
      statPrice: 'Pricing & Tiers',
      statEase: 'Ease of Use',
      statAICapabilities: 'AI Intelligence',
      statFeatures: 'Key AI Features',
      vs: 'VS'
    },
    deviceView: {
      label: 'Viewport View Mode:',
      phoneIphone: 'iPhone',
      phoneAndroid: 'Android',
      desktopWeb: 'Responsive Web'
    }
  },
  hi: {
    appName: 'एआई एडिटर टूल्स गाइड',
    subtitle: 'रचनाकारों के लिए सर्वश्रेष्ठ एआई टूलबॉक्स',
    searchPlaceholder: 'एआई उपकरण, सुविधाएं, या वर्कफ़्लो खोजें...',
    allCategories: 'सभी टूल्स',
    categories: {
      video: 'वीडियो एडिटिंग',
      photo: 'फोटो एडिटिंग',
      design: 'ग्राफिक डिज़ाइन',
      audio: 'ऑडियो एडिटिंग',
      content: 'सामग्री निर्माण',
      social: 'सोशल मीडिया'
    },
    tabs: {
      directory: 'टूल्स निर्देशिका',
      recommendation: 'स्मार्ट सिफारिश',
      comparison: 'तुलना मीटर',
      learn: 'कौशल सूचकांक'
    },
    filters: {
      skillLevel: 'कौशल का स्तर',
      pricing: 'मूल्य निर्धारण मॉडल',
      all: 'सभी दिखाएं',
      beginner: 'शुरुआती',
      intermediate: 'मध्यम स्तर',
      professional: 'पेशेवर स्तर',
      free: 'केवल मुफ़्त',
      freemium: 'फ्रीमियम',
      paid: 'सशुल्क प्रीमियम'
    },
    toolCard: {
      keyFeatures: 'मुख्य विशेषताएं',
      bestFor: 'इसके लिए सर्वश्रेष्ठ है',
      aiSuperpowers: 'एआई सुपरपावर्स',
      skill: 'कौशल लक्ष्य',
      pricing: 'मूल्य निर्धारण',
      ease: 'उपयोग में आसानी',
      aiPower: 'एआई क्षमताएं',
      compareBtn: 'तुलना में जोड़ें',
      removeCompare: 'तुलना में शामिल'
    },
    recommendation: {
      title: 'स्मार्ट एआई सहायता',
      subtitle: 'नीचे किसी भी सक्रिय कार्य का चयन करें और हम स्वचालित रूप से आपके प्रोजेक्ट वर्कफ़्लो के लिए सर्वश्रेष्ठ उपकरण ढूंढेंगे।',
      selectTask: 'अपना वांछित संपादन कार्य चुनें:',
      recommendedCombo: 'अनुशंसित उत्पादन वर्कफ़्लो',
      bestChoice: 'सबसे बेहतरीन विकल्प',
      alternatives: 'विचार करने योग्य विकल्प',
      howToApply: 'चरण-दर-चरण एआई गाइड',
      prosTitle: 'मुख्य लाभ'
    },
    comparison: {
      title: 'आमने-सामने तुलना',
      subtitle: 'तुरंत दो एआई उपकरणों की कीमतों, उपयोग में आसानी रेटिंग, क्षमताओं और सुपरपावर की तुलना करें।',
      searchToCompare: 'तुलना करने के लिए उपकरण चुनें...',
      selectPrompt: 'एक गहरी तुलना मैट्रिक्स देखने के लिए कोई भी दो उपकरण चुनें।',
      statGeneral: 'सामान्य विवरण',
      statPrice: 'मूल्य निर्धारण और स्तर',
      statEase: 'उपयोग में आसानी',
      statAICapabilities: 'एआई इंटेलिजेंस',
      statFeatures: 'प्रमुख एआई विशेषताएं',
      vs: 'बनाम'
    },
    deviceView: {
      label: 'व्यू पोर्ट मोड:',
      phoneIphone: 'आईफोन',
      phoneAndroid: 'एंड्रॉइड',
      desktopWeb: 'रेस्पॉन्सिव वेब'
    }
  }
};
