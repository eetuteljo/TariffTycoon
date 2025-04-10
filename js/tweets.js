/**
 * Tariff Tycoon: The Art of the Panic
 * Tweet Generation System
 */

// Tariff Tweets - Based on real-life tariff events
const tariffTweets = [
    {
        content: "Steel is the future. Tariff on all foreign steel. America first!",
        effect: "U.S. steel stocks spike, construction and auto stocks drop.",
        marketEffect: -5,
        wealthEffect: 50,
        scandalEffect: 5
    },
    {
        content: "China has taken advantage of us long enough. $500B in tariffs starts NOW!",
        effect: "Market panic, soy and tech stocks plummet.",
        marketEffect: -15,
        wealthEffect: -100,
        scandalEffect: 10
    },
    {
        content: "Great farmers are TRUE patriots. $28 billion bailout. Keep farming!",
        effect: "Farm stocks up, budget deficit increases.",
        marketEffect: 5,
        wealthEffect: 30,
        scandalEffect: 10
    },
    {
        content: "Tim Cook is a great guy. iPhones will be EXEMPT from tariffs!",
        effect: "Apple stock surges, rivals tank.",
        marketEffect: 0,
        wealthEffect: 80,
        scandalEffect: 15
    },
    {
        content: "No more guacamole until Mexico fixes the border!",
        effect: "Food and fast-casual restaurant stocks plunge.",
        marketEffect: -8,
        wealthEffect: -40,
        scandalEffect: 5
    },
    {
        content: "Canada's lumber is KILLING our forests. 20% tariff starts tomorrow!",
        effect: "Construction costs rise, housing stocks fall.",
        marketEffect: -7,
        wealthEffect: 45,
        scandalEffect: 8
    },
    {
        content: "European cars are a NATIONAL SECURITY threat. 25% tariff!",
        effect: "Auto stocks tumble, parts manufacturers struggle.",
        marketEffect: -10,
        wealthEffect: 60,
        scandalEffect: 12
    },
    {
        content: "Solar panels from China = UNFAIR! Big beautiful tariffs coming.",
        effect: "Renewable energy stocks drop, coal stocks rise slightly.",
        marketEffect: -5,
        wealthEffect: 40,
        scandalEffect: 7
    },
    {
        content: "French wine? Overrated! 100% tariff on all European wines!",
        effect: "Beverage stocks fluctuate, restaurant industry concerned.",
        marketEffect: -3,
        wealthEffect: 25,
        scandalEffect: 5
    },
    {
        content: "India's Harley Davidson tariffs are UNFAIR. Reciprocal tax NOW!",
        effect: "Motorcycle manufacturers worried, trade tensions increase.",
        marketEffect: -4,
        wealthEffect: 30,
        scandalEffect: 6
    },
    {
        content: "Suspending tariffs on Canadian aluminum. Great relationship with PM Trudeau!",
        effect: "Markets respond positively to reduced trade tensions.",
        marketEffect: 12,
        wealthEffect: 40,
        scandalEffect: -8
    },
    {
        content: "Delaying China tariffs until after Christmas shopping season. Helping consumers!",
        effect: "Retail stocks surge on tariff delay news.",
        marketEffect: 15,
        wealthEffect: 70,
        scandalEffect: -5
    },
    {
        content: "Reached new trade deal with South Korea. FAIR and RECIPROCAL!",
        effect: "Markets rally on reduced global trade tensions.",
        marketEffect: 10,
        wealthEffect: 60,
        scandalEffect: -10
    },
    {
        content: "Exempting medical supplies from tariffs during health crisis. America FIRST!",
        effect: "Healthcare stocks rise, public approval increases.",
        marketEffect: 8,
        wealthEffect: 45,
        scandalEffect: -15
    }
];

// Market Tweets - Based on real market reactions to Trump's tweets
const marketTweets = [
    {
        content: "Trade wars are good, and easy to win!",
        effect: "Stocks drop. Chaos mode unlocked.",
        marketEffect: -20,
        wealthEffect: -150,
        scandalEffect: 0
    },
    {
        content: "The Fed is too slow. Lower the rates already!",
        effect: "Bond market whiplash.",
        marketEffect: -8,
        wealthEffect: 70,
        scandalEffect: 5
    },
    {
        content: "Boeing 737 Max is DANGEROUS. Nobody wants to fly that junk!",
        effect: "Boeing stock nosedives, competitors surge.",
        marketEffect: -5,
        wealthEffect: 90,
        scandalEffect: 10
    },
    {
        content: "Amazon is ripping off the Post Office. Will FIX!",
        effect: "Amazon stock drops, shipping companies rise.",
        marketEffect: -7,
        wealthEffect: 60,
        scandalEffect: 5
    },
    {
        content: "Facebook is ANTI-AMERICAN! Time to regulate Big Tech!",
        effect: "Tech stocks tumble across the board.",
        marketEffect: -12,
        wealthEffect: -80,
        scandalEffect: 8
    },
    {
        content: "Oil prices too high! OPEC is at it again. NOT good!",
        effect: "Energy sector volatility, transportation stocks rise.",
        marketEffect: 5,
        wealthEffect: 50,
        scandalEffect: 0
    },
    {
        content: "Stock market at all-time high! My policies WORKING!",
        effect: "Brief market rally followed by profit-taking.",
        marketEffect: 10,
        wealthEffect: 100,
        scandalEffect: -5
    },
    {
        content: "Pharmaceutical drug prices are RIDICULOUS. Coming down FAST!",
        effect: "Pharma stocks plunge, healthcare sector unstable.",
        marketEffect: -10,
        wealthEffect: -60,
        scandalEffect: 5
    },
    {
        content: "Bitcoin is a SCAM. Not real money!",
        effect: "Cryptocurrency market crashes, traditional banks rise.",
        marketEffect: 3,
        wealthEffect: 40,
        scandalEffect: 0
    },
    {
        content: "American companies should leave China NOW! Order hereby issued!",
        effect: "Manufacturing stocks in chaos, supply chain concerns.",
        marketEffect: -15,
        wealthEffect: -120,
        scandalEffect: 15
    },
    {
        content: "Just had a GREAT call with business leaders. Jobs coming back to USA!",
        effect: "Markets rally on positive economic outlook.",
        marketEffect: 18,
        wealthEffect: 120,
        scandalEffect: -10
    },
    {
        content: "Tax cuts working BETTER than expected! Economy BOOMING!",
        effect: "Stocks surge across all sectors.",
        marketEffect: 20,
        wealthEffect: 150,
        scandalEffect: -8
    },
    {
        content: "Just signed an executive order cutting regulations. Business LOVES IT!",
        effect: "Market jumps on reduced regulatory burden news.",
        marketEffect: 15,
        wealthEffect: 100,
        scandalEffect: -5
    },
    {
        content: "Unemployment at LOWEST level in 50 years! Tremendous success!",
        effect: "Consumer confidence boosts retail and banking stocks.",
        marketEffect: 12,
        wealthEffect: 80,
        scandalEffect: -12
    },
    {
        content: "Just approved new infrastructure bill. Roads, bridges, JOBS!",
        effect: "Construction and materials stocks soar.",
        marketEffect: 16,
        wealthEffect: 110,
        scandalEffect: -7
    }
];

// Insider Trading Tweets - Based on real scandals
const insiderTweets = [
    {
        content: "Just got briefed on a TERRIBLE pandemic coming. Stock market will be fine!",
        effect: "Advisor 'Senator Blurr' sells biopharma stock minutes before your tweet.",
        marketEffect: -25,
        wealthEffect: 200,
        scandalEffect: 20
    },
    {
        content: "Hydroxychloroquine is a MIRACLE! I'm taking it myself!",
        effect: "Pharma stock rockets up; inner circle bought in yesterday.",
        marketEffect: 5,
        wealthEffect: 150,
        scandalEffect: 15
    },
    {
        content: "$100B in arms for our good friends in Saudi Arabia. Jobs, folks!",
        effect: "Defense stocks explode upwards, but scandal meter ticks up fast.",
        marketEffect: 15,
        wealthEffect: 180,
        scandalEffect: 25
    },
    {
        content: "Will be meeting with Pfizer CEO tomorrow. BIG news coming!",
        effect: "Healthcare stocks surge, your health secretary bought in last week.",
        marketEffect: 10,
        wealthEffect: 120,
        scandalEffect: 12
    },
    {
        content: "Government will STOP buying overpriced F-35 jets. Wasteful!",
        effect: "Defense contractor stocks plummet after your cronies short-sold.",
        marketEffect: -12,
        wealthEffect: 130,
        scandalEffect: 15
    },
    {
        content: "Just had a GREAT call with Putin. Lifting sanctions soon!",
        effect: "Russian stocks soar, your family's overseas investments boom.",
        marketEffect: 8,
        wealthEffect: 160,
        scandalEffect: 30
    },
    {
        content: "Coal is BACK! Ending Obama's war on coal miners TODAY!",
        effect: "Energy secretary's coal investments triple in value overnight.",
        marketEffect: 6,
        wealthEffect: 110,
        scandalEffect: 18
    },
    {
        content: "FDA will fast-track new COVID treatment next week. HUGE!",
        effect: "Biotech stocks skyrocket, your Mar-a-Lago members bought in early.",
        marketEffect: 18,
        wealthEffect: 190,
        scandalEffect: 22
    },
    {
        content: "Just ordered review of all government contracts. Waste everywhere!",
        effect: "Major contractor stocks fall after cabinet members divested yesterday.",
        marketEffect: -10,
        wealthEffect: 140,
        scandalEffect: 20
    },
    {
        content: "Big banks are doing GREAT things for our economy. Regulation rollback coming!",
        effect: "Financial stocks surge, your Treasury Secretary's former bank leads gains.",
        marketEffect: 12,
        wealthEffect: 170,
        scandalEffect: 15
    },
    {
        content: "Donating my presidential salary to Veterans Affairs. No one has ever done this!",
        effect: "Public approval rises, media coverage mostly positive.",
        marketEffect: 5,
        wealthEffect: -5,
        scandalEffect: -25
    },
    {
        content: "Just signed transparency order on drug pricing. Patients first!",
        effect: "Healthcare stocks adjust, public sentiment improves.",
        marketEffect: -3,
        wealthEffect: 40,
        scandalEffect: -20
    },
    {
        content: "Ordered investigation into my own administration. Nothing to hide!",
        effect: "Markets stable, scandal concerns temporarily eased.",
        marketEffect: 2,
        wealthEffect: 20,
        scandalEffect: -30
    },
    {
        content: "Visiting troops overseas for Thanksgiving. Greatest military ever!",
        effect: "Defense stocks steady, patriotic sentiment boosts approval.",
        marketEffect: 4,
        wealthEffect: 30,
        scandalEffect: -15
    },
    {
        content: "Signed bipartisan criminal justice reform. Second chances!",
        effect: "Private prison stocks drop, but overall market approves.",
        marketEffect: 7,
        wealthEffect: 50,
        scandalEffect: -18
    }
];

// Get a random tariff tweet
function getTariffTweet() {
    return tariffTweets[Math.floor(Math.random() * tariffTweets.length)];
}

// Get a random market tweet
function getMarketTweet() {
    return marketTweets[Math.floor(Math.random() * marketTweets.length)];
}

// Get a random insider tweet
function getInsiderTweet() {
    return insiderTweets[Math.floor(Math.random() * insiderTweets.length)];
}

// Get a weighted random tweet (more likely to get tariff tweets early in the game)
function getWeightedRandomTweet() {
    // Weights change based on game progress
    let tariffWeight = 0.5 - (gameState.year - 1) * 0.1; // Decreases as game progresses
    let marketWeight = 0.3 + (gameState.year - 1) * 0.05; // Increases slightly
    let insiderWeight = 0.2 + (gameState.year - 1) * 0.05; // Increases slightly
    
    // Ensure weights are valid
    tariffWeight = Math.max(0.2, tariffWeight);
    marketWeight = Math.min(0.4, marketWeight);
    insiderWeight = Math.min(0.4, insiderWeight);
    
    // Normalize weights
    const totalWeight = tariffWeight + marketWeight + insiderWeight;
    tariffWeight /= totalWeight;
    marketWeight /= totalWeight;
    insiderWeight /= totalWeight;
    
    // Random value between 0 and 1
    const random = Math.random();
    
    // Select tweet type based on weights
    if (random < tariffWeight) {
        return getTariffTweet();
    } else if (random < tariffWeight + marketWeight) {
        return getMarketTweet();
    } else {
        return getInsiderTweet();
    }
}

// Generate a custom tweet based on game state
function generateCustomTweet() {
    // Base templates
    const templates = [
        "Just announced a {size} tariff on {country}'s {product}! {sentiment}",
        "The {industry} industry is {performance}. {action} immediately!",
        "Had a {quality} meeting with {leader}. {outcome}",
        "{country} has been {behavior} for too long. {consequence}!"
    ];
    
    // Fill-in values
    const sizes = ["HUGE", "small", "reasonable", "massive", "beautiful"];
    const countries = ["China", "Mexico", "Canada", "Germany", "Japan", "South Korea", "France"];
    const products = ["steel", "cars", "electronics", "food", "medicine", "technology"];
    const sentiments = ["America First!", "Winning!", "Jobs!", "MAGA!", "Believe me!"];
    const industries = ["tech", "auto", "healthcare", "energy", "banking", "retail"];
    const performances = ["FAILING", "booming", "struggling", "taking advantage of us", "winning"];
    const actions = ["Must fix", "Will help", "Looking into it", "Taking action", "Watching closely"];
    const qualities = ["tremendous", "disappointing", "productive", "AMAZING", "boring"];
    const leaders = ["Xi", "Putin", "Merkel", "Macron", "Kim Jong Un", "Trudeau"];
    const outcomes = ["Great deals coming!", "They're scared of us!", "They agreed to everything!", "They're not happy!"];
    const behaviors = ["cheating", "taking advantage", "being unfair", "manipulating currency", "stealing jobs"];
    const consequences = ["Tariffs coming", "Sanctions ready", "No more Mr. Nice Guy", "America will respond", "They'll regret it"];
    
    // Select random template
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Fill in template
    let tweet = template
        .replace("{size}", sizes[Math.floor(Math.random() * sizes.length)])
        .replace("{country}", countries[Math.floor(Math.random() * countries.length)])
        .replace("{product}", products[Math.floor(Math.random() * products.length)])
        .replace("{sentiment}", sentiments[Math.floor(Math.random() * sentiments.length)])
        .replace("{industry}", industries[Math.floor(Math.random() * industries.length)])
        .replace("{performance}", performances[Math.floor(Math.random() * performances.length)])
        .replace("{action}", actions[Math.floor(Math.random() * actions.length)])
        .replace("{quality}", qualities[Math.floor(Math.random() * qualities.length)])
        .replace("{leader}", leaders[Math.floor(Math.random() * leaders.length)])
        .replace("{outcome}", outcomes[Math.floor(Math.random() * outcomes.length)])
        .replace("{behavior}", behaviors[Math.floor(Math.random() * behaviors.length)])
        .replace("{consequence}", consequences[Math.floor(Math.random() * consequences.length)]);
    
    // Generate random effects based on game state
    const marketEffect = Math.floor(Math.random() * 30) - 15; // -15 to +15
    const wealthEffect = Math.floor(Math.random() * 200) - 50; // -50 to +150
    const scandalEffect = Math.floor(Math.random() * 20); // 0 to 20
    
    // Generate effect description
    let effect = "";
    if (marketEffect > 5) {
        effect = "Markets rally on your bold leadership!";
    } else if (marketEffect < -5) {
        effect = "Markets panic over uncertainty!";
    } else {
        effect = "Markets show mixed reaction.";
    }
    
    return {
        content: tweet,
        effect: effect,
        marketEffect: marketEffect,
        wealthEffect: wealthEffect,
        scandalEffect: scandalEffect
    };
}
