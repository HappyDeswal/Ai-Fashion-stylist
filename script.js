// DOM Element Selections
const homeSection = document.getElementById('home-section');
const uploadSection = document.getElementById('upload-section');
const loadingSection = document.getElementById('loading-section');
const resultsSection = document.getElementById('results-section');
const errorSection = document.getElementById('error-section');
const errorMessage = document.getElementById('error-message');
const imageUploadInput = document.getElementById('image-upload');
const imageUploadLabel = document.getElementById('image-upload-label');
const fileNameDisplay = document.getElementById('file-name');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const analyzeButton = document.getElementById('analyze-button');
const startOverButton = document.getElementById('start-over-button');
const uploadedImage = document.getElementById('uploaded-image');
const aiAnalysisOutput = document.getElementById('ai-analysis-output');
const similarItemsGrid = document.getElementById('similar-items-grid');
const complementaryItemsGrid = document.getElementById('complementary-items-grid');
const dismissErrorButtonAlt = document.getElementById('dismiss-error-button-alt');
const shareFacebookButton = document.getElementById('share-facebook');
const shareTwitterButton = document.getElementById('share-twitter');
const shareInstagramButton = document.getElementById('share-instagram');
const shareGeneralButton = document.getElementById('share-general');
const profileButton = document.getElementById('profile-button');
const profileModal = document.getElementById('profile-modal');
const closeProfileButton = document.getElementById('close-profile-button');
const wardrobeItems = document.getElementById('wardrobe-items');
const clearWardrobeButton = document.getElementById('clear-wardrobe-button');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

// Fashion Quotes Database
const fashionQuotes = [
    { text: "Fashion is not necessarily about labels. It's not about brands. It's about something else that comes from within you.", author: "Rachel Roy" },
    { text: "Style is a way to say who you are without having to speak.", author: "Rachel Zoe" },
    { text: "Fashion fades, but style is eternal.", author: "Yves Saint Laurent" },
    { text: "Elegance is the only beauty that never fades.", author: "Audrey Hepburn" },
    { text: "Clothes aren't going to change the world, the women who wear them will.", author: "Anne Klein" },
    { text: "Fashion is the armor to survive the reality of everyday life.", author: "Bill Cunningham" },
    { text: "You can have anything you want in life if you dress for it.", author: "Edith Head" },
    { text: "Style is knowing who you are, what you want to say, and not giving a damn.", author: "Gore Vidal" },
    { text: "Fashion is about dreaming and making other people dream.", author: "Donatella Versace" },
    { text: "The most beautiful makeup of a woman is passion. But cosmetics are easier to buy.", author: "Yves Saint Laurent" },
    { text: "Dress like you're already famous.", author: "Unknown" },
    { text: "Fashion is what you buy, style is what you do with it.", author: "Unknown" },
    { text: "Life is too short to wear boring clothes.", author: "Unknown" },
    { text: "Fashion is art and you are the canvas.", author: "Unknown" },
    { text: "Be yourself, everyone else is already taken.", author: "Oscar Wilde" },
    { text: "Your style should be as unique as your fingerprint.", author: "Unknown" },
    { text: "Fashion is the most powerful art there is. It's movement, design and architecture all in one.", author: "Blanca Li" },
    { text: "I don't do fashion, I am fashion.", author: "Coco Chanel" },
    { text: "Fashion is not about utility. An accessory is merely a piece of iconography used to express individual identity.", author: "Valerie Steele" },
    { text: "The joy of dressing is an art.", author: "John Galliano" }
];

let uploadedFile = null;
let lastQuoteIndex = -1; // Track the last quote to ensure it changes

// Initialize with a random quote
updateQuote();

// Event Listeners for Drag and Drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    imageUploadLabel.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

imageUploadLabel.addEventListener('dragenter', () => imageUploadLabel.classList.add('dragover'));
imageUploadLabel.addEventListener('dragover', () => imageUploadLabel.classList.add('dragover'));
imageUploadLabel.addEventListener('dragleave', () => imageUploadLabel.classList.remove('dragover'));
imageUploadLabel.addEventListener('drop', (e) => {
    imageUploadLabel.classList.remove('dragover');
    const dt = e.dataTransfer;
    const file = dt.files[0];
    handleFile(file);
});

// File Input Change
imageUploadInput.addEventListener('change', (event) => {
    handleFile(event.target.files[0]);
});

function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        uploadedFile = file;
        fileNameDisplay.textContent = `📸 ${file.name}`;
        analyzeButton.disabled = false;

        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreviewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file! 📷');
    }
}

// Button Event Listeners
analyzeButton.addEventListener('click', handleImageUpload);
startOverButton.addEventListener('click', () => {
    resetApp();
    updateQuote(); // Update quote when starting over
});

// Profile Modal
profileButton.addEventListener('click', () => {
    profileModal.classList.remove('hidden');
    loadWardrobe();
});

closeProfileButton.addEventListener('click', () => {
    profileModal.classList.add('hidden');
});

clearWardrobeButton.addEventListener('click', clearWardrobe);

// Error Handling
dismissErrorButtonAlt.addEventListener('click', () => {
    errorSection.classList.add('hidden');
    updateQuote(); // Update quote when dismissing error
});

// Social Sharing
shareFacebookButton.addEventListener('click', () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out my AI-styled outfit! ✨ #AIFashion #StyleAI");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
});

shareTwitterButton.addEventListener('click', () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out my AI-styled outfit! ✨ #AIFashion #StyleAI");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
});

shareInstagramButton.addEventListener('click', () => {
    // Copy to clipboard for Instagram
    navigator.clipboard.writeText(window.location.href + " Check out my AI-styled outfit! ✨ #AIFashion #StyleAI").then(() => {
        alert('Link copied! 📋 Share it on Instagram! 📷');
    }).catch(() => {
        alert('Copy this link: ' + window.location.href + " Check out my AI-styled outfit! ✨ #AIFashion #StyleAI");
    });
});

shareGeneralButton.addEventListener('click', async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'My AI-Styled Outfit ✨',
                text: 'Check out my AI-styled outfit! #AIFashion #StyleAI',
                url: window.location.href
            });
        } catch (error) {
            console.error('Error sharing:', error);
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href + " Check out my AI-styled outfit! ✨ #AIFashion #StyleAI").then(() => {
                alert('Link copied to clipboard! 📋');
            });
        }
    } else {
        navigator.clipboard.writeText(window.location.href + " Check out my AI-styled outfit! ✨ #AIFashion #StyleAI").then(() => {
            alert('Link copied to clipboard! 📋');
        }).catch(() => {
            alert('Copy this link: ' + window.location.href + " Check out my AI-styled outfit! ✨ #AIFashion #StyleAI");
        });
    }
});

// Main Functions
async function handleImageUpload() {
    if (!uploadedFile) return;

    homeSection.classList.add('hidden');
    uploadSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    errorSection.classList.add('hidden');

    // Update quote when AI starts working
    updateQuote();

    try {
        const base64ImageData = await toBase64(uploadedFile);
        const analysis = await getAiAnalysis(base64ImageData);

        if (!analysis || !analysis.category) {
            throw new Error("AI couldn't analyze your image. Try a clearer photo! 📸");
        }

        const recommendations = await getRecommendations(analysis);
        await displayResults(base64ImageData, analysis, recommendations);

        // Update quote after successful analysis and results display
        updateQuote();

    } catch (error) {
        console.error('Error in processing:', error);
        showError(error.message);
    }
}

function showError(message) {
    loadingSection.classList.add('hidden');
    errorSection.classList.remove('hidden');
    errorMessage.textContent = message;
    // Update quote on error
    updateQuote();
}

async function displayResults(base64Image, analysis, recommendations) {
    uploadedImage.src = `data:image/jpeg;base64,${base64Image}`;

    aiAnalysisOutput.innerHTML = `
        <span class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">${analysis.category} 🎨</span>
        <span class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">${analysis.color} 🌈</span>
        <span class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">${analysis.style} ✨</span>
    `;

    similarItemsGrid.innerHTML = '';
    complementaryItemsGrid.innerHTML = '';

    for (const item of recommendations) {
        const card = await createProductCard(item);
        if (item.type === 'similar') {
            similarItemsGrid.innerHTML += card;
        } else {
            complementaryItemsGrid.innerHTML += card;
        }
    }

    loadingSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

function getStoreColor(store) {
    const colors = {
        amazon: 'from-orange-500 to-red-500',
        flipkart: 'from-blue-500 to-indigo-500',
        myntra: 'from-pink-500 to-rose-500',
        meesho: 'from-purple-500 to-violet-500',
        zara: 'from-gray-700 to-gray-900',
        hm: 'from-red-500 to-pink-500',
        uniqlo: 'from-teal-500 to-cyan-500',
        asos: 'from-green-500 to-emerald-500',
        nike: 'from-black to-gray-800',
        adidas: 'from-black to-gray-700'
    };
    return colors[store] || 'from-gray-500 to-gray-700';
}

function getStoreDisplayName(store) {
    const names = {
        amazon: 'Amazon',
        flipkart: 'Flipkart',
        myntra: 'Myntra',
        meesho: 'Meesho',
        zara: 'Zara',
        hm: 'H&M',
        uniqlo: 'Uniqlo',
        asos: 'ASOS',
        nike: 'Nike',
        adidas: 'Adidas'
    };
    return names[store] || store.charAt(0).toUpperCase() + store.slice(1);
}

function updateQuote() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * fashionQuotes.length);
    } while (randomIndex === lastQuoteIndex && fashionQuotes.length > 1); // Ensure different quote

    lastQuoteIndex = randomIndex;
    const randomQuote = fashionQuotes[randomIndex];

    if (quoteText && quoteAuthor) {
        quoteText.textContent = `"${randomQuote.text}"`;
        quoteAuthor.textContent = `— ${randomQuote.author}`;
        console.log('Quote updated:', randomQuote.text); // Debug log
    } else {
        console.error('Quote elements not found!'); // Debug log
    }
}

async function createProductCard(item) {
    // Try to get real image, fallback to placeholder
    let imageUrl;
    try {
        imageUrl = await fetchProductImage(item.name);
    } catch (error) {
        imageUrl = `https://via.placeholder.com/400x500/6366f1/ffffff?text=${encodeURIComponent(item.name.substring(0, 20))}`;
    }

    const storeColorClass = getStoreColor(item.store);
    const storeDisplayName = getStoreDisplayName(item.store);

    return `
        <div class="product-card rounded-2xl p-6 overflow-hidden">
            <img src="${imageUrl}" alt="${item.name}" class="w-full h-48 object-cover rounded-xl mb-4" onerror="this.src='https://via.placeholder.com/400x500/6366f1/ffffff?text=Image+Error'">
            <div class="flex justify-between items-start mb-3">
                <h4 class="font-bold text-lg flex-grow pr-2 text-gray-800">${item.name}</h4>
                <span class="bg-gradient-to-r ${storeColorClass} text-white text-xs font-bold uppercase px-3 py-1 rounded-full">${storeDisplayName}</span>
            </div>
            <p class="text-gray-600 text-sm mb-4">${item.description}</p>
            <div class="flex gap-2">
                <a href="${item.buyLink}" target="_blank" rel="noopener noreferrer" class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 px-4 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all">
                    🛒 Shop Now
                </a>
                <button onclick="saveToWardrobe('${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}', '${imageUrl}', '${item.buyLink}')" class="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-xl font-bold hover:from-green-600 hover:to-teal-600 transition-all">
                    💾 Save
                </button>
            </div>
        </div>
    `;
}

async function fetchProductImage(productName) {
    try {
        const apiKey = "kh9UgWgrP7Qxg5ElU0hE5wthEEEQAPNVTHJO-mDWuRo"; // Unsplash access key
        const query = encodeURIComponent(productName + " fashion clothing");
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${apiKey}`);

        if (!response.ok) {
            throw new Error('Unsplash API request failed');
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0].urls.regular;
        } else {
            throw new Error('No images found');
        }
    } catch (error) {
        throw error; // Let the caller handle the fallback
    }
}

function saveToWardrobe(name, description, imageUrl, buyLink) {
    const wardrobe = JSON.parse(localStorage.getItem('wardrobe') || '[]');
    wardrobe.push({ name, description, imageUrl, buyLink, date: new Date().toISOString() });
    localStorage.setItem('wardrobe', JSON.stringify(wardrobe));

    // Show success animation
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '✅ Saved!';
    button.classList.add('bg-gradient-to-r', 'from-green-600', 'to-teal-600');
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('bg-gradient-to-r', 'from-green-600', 'to-teal-600');
    }, 2000);
}

function loadWardrobe() {
    const wardrobe = JSON.parse(localStorage.getItem('wardrobe') || '[]');
    wardrobeItems.innerHTML = wardrobe.length === 0
        ? '<div class="text-center py-8"><div class="text-6xl mb-4">👗</div><p class="text-white/70 text-lg">Your wardrobe is empty! Start saving your favorite items.</p></div>'
        : wardrobe.map(item => `
            <a href="${item.buyLink}" target="_blank" rel="noopener noreferrer" class="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 hover:bg-white/20 transition-all cursor-pointer block">
                <img src="${item.imageUrl}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg border-2 border-white/30">
                <div class="flex-grow">
                    <h4 class="font-bold text-white text-sm">${item.name}</h4>
                    <p class="text-white/70 text-xs">${item.description}</p>
                    <p class="text-white/50 text-xs mt-1">${new Date(item.date).toLocaleDateString()}</p>
                </div>
                <div class="text-white/50 text-lg">🛒</div>
            </a>
        `).join('');
}

function clearWardrobe() {
    if (confirm('Are you sure you want to clear your entire wardrobe? This action cannot be undone! 🗑️')) {
        localStorage.removeItem('wardrobe');
        loadWardrobe();
    }
}

function resetApp() {
    resultsSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    homeSection.classList.remove('hidden');
    uploadSection.classList.remove('hidden');

    imageUploadInput.value = '';
    uploadedFile = null;
    fileNameDisplay.textContent = '';
    analyzeButton.disabled = true;
    imagePreviewContainer.classList.add('hidden');
    imagePreview.src = '#';
}

// Gemini API Functions
async function callGeminiApi(payload) {
    const apiKey = "AIzaSyCC2QZd5hufJF_5LM6FroY65DmcN8341Po";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    let retries = 3;
    let delay = 1000;

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0].text) {
                return result.candidates[0].content.parts[0].text;
            } else {
                let reason = result.promptFeedback?.blockReason || "Unknown reason";
                throw new Error(`Content generation blocked by API. Reason: ${reason}`);
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i < retries - 1) {
                await new Promise(res => setTimeout(res, delay));
                delay *= 2;
            } else {
                throw error;
            }
        }
    }
}

async function getAiAnalysis(base64ImageData) {
    const prompt = "Analyze the clothing item in this image. Respond with only a single, valid JSON object with three keys: 'category', 'color', and 'style'. Be descriptive and creative in your analysis.";

    const payload = {
        contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: base64ImageData } }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "category": { "type": "STRING" },
                    "color": { "type": "STRING" },
                    "style": { "type": "STRING" }
                },
                required: ["category", "color", "style"]
            }
        }
    };

    const jsonString = await callGeminiApi(payload);
    return JSON.parse(jsonString);
}

async function getRecommendations(analysis) {
    const prompt = `Based on a '${analysis.color} ${analysis.style} ${analysis.category}', generate fashion recommendations. Provide a single, valid JSON array of 6 items. 3 'similar', 3 'complementary'. Each object must have four keys: 'name' (a creative and descriptive product name, e.g., 'High-Waisted Blue Denim Jeans'), 'description' (a stylish one-sentence description), 'type' ('similar' or 'complementary'), and 'store' (MUST include amazon, flipkart, and meesho as stores, plus choose from 'myntra', 'zara', 'hm', 'uniqlo', 'asos', 'nike', 'adidas'). Make the recommendations trendy and appealing to young fashion enthusiasts.`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        "name": { "type": "STRING" },
                        "description": { "type": "STRING" },
                        "type": { "type": "STRING", "enum": ["similar", "complementary"] },
                        "store": { "type": "STRING", "enum": ["amazon", "flipkart", "myntra", "meesho", "zara", "hm", "uniqlo", "asos", "nike", "adidas"] }
                    },
                    required: ["name", "description", "type", "store"]
                }
            }
        }
    };

    const jsonString = await callGeminiApi(payload);
    const items = JSON.parse(jsonString);

    // Generate working product search links for reputed brands
    return items.map(item => {
        const query = encodeURIComponent(item.name);
        let buyLink = '#';
        switch (item.store) {
            case 'amazon':
                buyLink = `https://www.amazon.in/s?k=${query}&ref=sr_pg_1`;
                break;
            case 'flipkart':
                buyLink = `https://www.flipkart.com/search?q=${query}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`;
                break;
            case 'myntra':
                buyLink = `https://www.myntra.com/${query.replace(/%20/g, "-").toLowerCase()}`;
                break;
            case 'meesho':
                buyLink = `https://www.meesho.com/search?q=${query}&searchType=POPULAR_SEARCH&searchIdentifier=text_search`;
                break;
            case 'zara':
                buyLink = `https://www.zara.com/in/en/search?searchTerm=${query}`;
                break;
            case 'hm':
                buyLink = `https://www2.hm.com/en_in/search-results.html?q=${query}`;
                break;
            case 'uniqlo':
                buyLink = `https://www.uniqlo.com/in/en/search?q=${query}`;
                break;
            case 'asos':
                buyLink = `https://www.asos.com/search/?q=${query}`;
                break;
            case 'nike':
                buyLink = `https://www.nike.com/in/w?q=${query}`;
                break;
            case 'adidas':
                buyLink = `https://www.adidas.co.in/search?q=${query}`;
                break;
            default:
                // Fallback for unrecognized stores - use Google search
                buyLink = `https://www.google.com/search?q=${query}+fashion+clothing`;
                break;
        }
        return { ...item, buyLink };
    });
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});
