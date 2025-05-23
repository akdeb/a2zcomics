"use client"

import { ArrowLeft, ArrowRight, Upload, Sparkles } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import type React from "react"

const greekGods = [
  {
    name: "Aphrodite",
    domains: ["love", "beauty"],
    strengths: ["charm", "creativity"],
    weaknesses: ["jealousy", "vanity"],
    vibes: ["the smooth talker", "the wild card"],
    weapons: ["mirror", "magic girdle"],
    visual: {
      masculine: "gold chain & glow-up",
      feminine: "flowing pink + sparkles",
      androgynous: "gender-melting glam",
    },
  },
  {
    name: "Apollo",
    domains: ["music", "healing", "prophecy"],
    strengths: ["creativity", "leadership", "persuasion"],
    weaknesses: ["pride", "vengefulness"],
    vibes: ["the leader", "the smooth talker"],
    weapons: ["lyre", "bow", "poison"],
    visual: {
      masculine: "golden laurel crown + lyre",
      feminine: "divine musician robes",
      androgynous: "ethereal artist aura",
    },
  },
  {
    name: "Ares",
    domains: ["war", "chaos"],
    strengths: ["strength", "chaos energy"],
    weaknesses: ["impulsiveness", "pride"],
    vibes: ["the wild card", "the chaos agent"],
    weapons: ["sword", "spear"],
    visual: {
      masculine: "blood-red armor",
      feminine: "battle corset + spear",
      androgynous: "brutalist warform",
    },
  },
  {
    name: "Artemis",
    domains: ["nature", "independence"],
    strengths: ["resilience", "creativity"],
    weaknesses: ["jealousy", "vengefulness"],
    vibes: ["the quiet observer", "the peacemaker"],
    weapons: ["bow and arrow"],
    visual: {
      masculine: "wild archer garb",
      feminine: "moonlit huntress gear",
      androgynous: "forest ranger fit",
    },
  },
  {
    name: "Athena",
    domains: ["strategy", "wisdom"],
    strengths: ["strategy", "creativity", "resilience"],
    weaknesses: ["overthinking", "pride"],
    vibes: ["the leader", "the quiet observer"],
    weapons: ["sword", "shield", "spear"],
    visual: {
      masculine: "armor + owl",
      feminine: "helmet + flowing robes",
      androgynous: "austere war cloak",
    },
  },
  {
    name: "Demeter",
    domains: ["agriculture", "harvest", "nurturing"],
    strengths: ["resilience", "creativity", "leadership"],
    weaknesses: ["overthinking", "vengefulness"],
    vibes: ["the peacemaker", "the leader"],
    weapons: ["sickle", "torch"],
    visual: {
      masculine: "harvest crown + grain",
      feminine: "earth mother robes",
      androgynous: "nature's guardian",
    },
  },
  {
    name: "Dionysus",
    domains: ["wine", "madness", "art"],
    strengths: ["creativity", "chaos energy"],
    weaknesses: ["impulsiveness", "pride"],
    vibes: ["the chaos agent", "the wild card"],
    weapons: ["wine", "thyrsus"],
    visual: {
      masculine: "grape crown + silk",
      feminine: "divine rave queen",
      androgynous: "disco cult leader",
    },
  },
  {
    name: "Hades",
    domains: ["death", "wealth"],
    strengths: ["resilience", "strategy"],
    weaknesses: ["overthinking", "indecision"],
    vibes: ["the quiet observer"],
    weapons: ["helmet of invisibility", "scepter"],
    visual: {
      masculine: "dark robes + shadows",
      feminine: "obsidian crown + veil",
      androgynous: "gothcore ruler",
    },
  },
  {
    name: "Hephaestus",
    domains: ["craftsmanship", "fire", "technology"],
    strengths: ["creativity", "resilience", "strategy"],
    weaknesses: ["overthinking", "indecision"],
    vibes: ["the quiet observer", "the peacemaker"],
    weapons: ["hammer", "anvil", "fire"],
    visual: {
      masculine: "smith's apron + tools",
      feminine: "forge-master's gear",
      androgynous: "steampunk artisan",
    },
  },
  {
    name: "Hermes",
    domains: ["speed", "wit"],
    strengths: ["persuasion", "creativity"],
    weaknesses: ["indecision", "impulsiveness"],
    vibes: ["the smooth talker", "the quiet observer"],
    weapons: ["winged sandals", "caduceus"],
    visual: {
      masculine: "light traveler robes",
      feminine: "trickster cloak",
      androgynous: "vaporwave courier",
    },
  },
  {
    name: "Hestia",
    domains: ["hearth", "home", "family"],
    strengths: ["resilience", "strategy", "persuasion"],
    weaknesses: ["overthinking", "indecision"],
    vibes: ["the peacemaker", "the quiet observer"],
    weapons: ["hearth flame", "sacred fire"],
    visual: {
      masculine: "hearth keeper's robes",
      feminine: "flame-touched vestments",
      androgynous: "eternal flame form",
    },
  },
  {
    name: "Poseidon",
    domains: ["oceans", "storms", "earthquakes"],
    strengths: ["power", "chaos energy", "leadership"],
    weaknesses: ["pride", "impulsiveness"],
    vibes: ["the wild card", "the leader"],
    weapons: ["trident", "storm"],
    visual: {
      masculine: "sea crown + trident",
      feminine: "wave-woven armor",
      androgynous: "ocean storm form",
    },
  },
  {
    name: "Zeus",
    domains: ["leadership", "sky"],
    strengths: ["leadership", "power"],
    weaknesses: ["pride", "impulsiveness"],
    vibes: ["the leader"],
    weapons: ["lightning bolt", "thunder"],
    visual: {
      masculine: "chest out + beard",
      feminine: "thunder goddess robes",
      androgynous: "storm-wrapped titan",
    },
  },
];

type Gender = "masculine" | "feminine" | "androgynous" | string;
type UserInput = {
  strength: string;
  weakness: string;
  socialVibe: string;
  weapon: string;
  gender: Gender;
  image: string | null;
};

type GodMatch = {
  name: string;
  score: number;
  visual: string;
};

// Add this type definition before the getCardColors function
type CardColors = {
  border: string;
  bg: string;
  accent: string;
  gradient: string;
};

function matchGod(userInput: UserInput): GodMatch {
  const { strength, weakness, socialVibe, weapon, gender } = userInput;
  
  // Helper function to add random variation to a score with more precision
  const addRandomVariation = (baseScore: number, maxVariation: number = 1) => {
    // Generate a random number between -maxVariation and +maxVariation with more decimal places
    const variation = (Math.random() * 2 - 1) * maxVariation;
    // Add a small random factor (0-0.3) to create more variety
    const extraRandom = Math.random() * 0.3;
    return Math.max(0, baseScore + variation + extraRandom);
  };

  // Helper function to generate a random personality factor
  const getPersonalityFactor = () => {
    // Returns a random number between 0.8 and 1.2 to simulate personality compatibility
    return 0.8 + Math.random() * 0.4;
  };

  const scores = greekGods.map((god) => {
    let score = 0;
    const personalityFactor = getPersonalityFactor();
    
    // Add random variation to each component with different ranges
    if (god.strengths.includes(strength)) {
      // Base 3 points with ±0.8 variation and personality factor
      score += addRandomVariation(3, 0.8) * personalityFactor;
    }
    if (god.weaknesses.includes(weakness)) {
      // Base 2 points with ±0.6 variation and personality factor
      score += addRandomVariation(2, 0.6) * personalityFactor;
    }
    if (god.vibes.includes(socialVibe)) {
      // Base 2 points with ±0.7 variation and personality factor
      score += addRandomVariation(2, 0.7) * personalityFactor;
    }
    if (god.weapons.includes(weapon)) {
      // Base 1 point with ±0.5 variation and personality factor
      score += addRandomVariation(1, 0.5) * personalityFactor;
    }

    // Add a random bonus that varies based on the god's domains
    const domainBonus = god.domains.length * (0.2 + Math.random() * 0.3);
    score += domainBonus;

    // Add a small random factor (0-0.4) to create more variety
    score += Math.random() * 0.4;

    return {
      name: god.name,
      score: Number(score.toFixed(3)), // Round to 3 decimal places for more precision
      visual: god.visual[gender as keyof typeof god.visual] || god.visual.androgynous,
    };
  });

  // Sort by score and return the highest match
  scores.sort((a, b) => b.score - a.score);
  return scores[0];
}

function getCardColors(god: GodMatch, userInput: UserInput): CardColors {
  // Base color mappings for different domains
  const domainColors = {
    // Primary domains
    love: { border: "border-pink-500", bg: "bg-pink-50", accent: "bg-pink-500" },
    war: { border: "border-red-600", bg: "bg-red-50", accent: "bg-red-600" },
    wisdom: { border: "border-blue-500", bg: "bg-blue-50", accent: "bg-blue-500" },
    music: { border: "border-purple-500", bg: "bg-purple-50", accent: "bg-purple-500" },
    nature: { border: "border-green-500", bg: "bg-green-50", accent: "bg-green-500" },
    death: { border: "border-gray-700", bg: "bg-gray-50", accent: "bg-gray-700" },
    leadership: { border: "border-amber-500", bg: "bg-amber-50", accent: "bg-amber-500" },
    // Secondary domains
    beauty: { border: "border-rose-500", bg: "bg-rose-50", accent: "bg-rose-500" },
    chaos: { border: "border-orange-600", bg: "bg-orange-50", accent: "bg-orange-600" },
    healing: { border: "border-emerald-500", bg: "bg-emerald-50", accent: "bg-emerald-500" },
    prophecy: { border: "border-indigo-500", bg: "bg-indigo-50", accent: "bg-indigo-500" },
    craftsmanship: { border: "border-amber-600", bg: "bg-amber-50", accent: "bg-amber-600" },
    harvest: { border: "border-lime-500", bg: "bg-lime-50", accent: "bg-lime-500" },
    oceans: { border: "border-cyan-500", bg: "bg-cyan-50", accent: "bg-cyan-500" },
    hearth: { border: "border-orange-500", bg: "bg-orange-50", accent: "bg-orange-500" },
  };

  // Find the matched god's full data
  const matchedGod = greekGods.find(g => g.name === god.name);
  if (!matchedGod) return { border: "border-amber-600", bg: "bg-amber-50", accent: "bg-amber-600", gradient: "bg-amber-50" };

  // Get colors based on primary domain
  const primaryDomain = matchedGod.domains[0];
  const colors = domainColors[primaryDomain as keyof typeof domainColors] || 
                { border: "border-amber-600", bg: "bg-amber-50", accent: "bg-amber-600" };

  // Add a subtle gradient based on secondary domain if it exists
  const secondaryDomain = matchedGod.domains[1];
  const secondaryColors = secondaryDomain ? 
    domainColors[secondaryDomain as keyof typeof domainColors] : null;

  return {
    ...colors,
    gradient: secondaryColors ? 
      `bg-gradient-to-br from-${colors.bg.split('-')[1]}-50 to-${secondaryColors.bg.split('-')[1]}-100` :
      colors.bg
  };
}

export default function TopTrumpGenerator() {
  // State for form data
  const [formData, setFormData] = useState({
    strength: "",
    weakness: "",
    socialVibe: "",
    weapon: "",
    gender: "",
    image: null as string | null,
  })

  // State for current step
  const [currentStep, setCurrentStep] = useState(0)

  // State for showing the generated card
  const [showCard, setShowCard] = useState(false)

  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Define the steps/questions
  const steps = [
    {
      id: "image",
      title: "Upload your image 📸",
      description: "This will be used for your Top Trump card",
      type: "image",
    },
    {
      id: "strength",
      title: "What's your greatest strength? 💪",
      description: "This will determine your godly domain or superpower",
      options: [
        { value: "creativity", label: "Creativity" },
        { value: "strategy", label: "Strategy" },
        { value: "leadership", label: "Leadership" },
        { value: "chaosEnergy", label: "Chaos Energy" },
        { value: "hotness", label: "Hotness" },
        { value: "resilience", label: "Resilience" },
        { value: "persuasion", label: "Persuasion" },
      ],
    },
    {
      id: "weakness",
      title: "What's your biggest weakness? 🔮",
      description: "This will determine your tragic flaw or mythic downfall",
      options: [
        { value: "jealousy", label: "Jealousy" },
        { value: "pride", label: "Pride" },
        { value: "overthinking", label: "Overthinking" },
        { value: "impulsiveness", label: "Impulsiveness" },
        { value: "vengefulness", label: "Vengefulness" },
        { value: "indecision", label: "Indecision" },
      ],
    },
    {
      id: "socialVibe",
      title: "What's your vibe in a group setting? 👥",
      description: "This maps to social power, charisma, aloofness, etc.",
      options: [
        { value: "leader", label: "The leader" },
        { value: "chaosAgent", label: "The chaos agent" },
        { value: "observer", label: "The quiet observer" },
        { value: "smoothTalker", label: "The smooth talker" },
        { value: "peacemaker", label: "The peacemaker" },
        { value: "wildCard", label: "The wild card" },
      ],
    },
    {
      id: "weapon",
      title: "Pick a weapon or power: ⚡",
      description: "This matches mythic iconography",
      options: [
        { value: "lightning", label: "Lightning bolt" },
        { value: "bow", label: "Bow and arrow" },
        { value: "sword", label: "Sword" },
        { value: "mirror", label: "Mirror" },
        { value: "fire", label: "Fire" },
        { value: "lyre", label: "Lyre" },
        { value: "poison", label: "Poison" },
      ],
    },
    {
      id: "gender",
      title: "Do you want your match and visual to reflect your gender identity? 🧬",
      description: "This is optional",
      options: [
        { value: "masculine", label: "Masculine" },
        { value: "feminine", label: "Feminine" },
        { value: "androgynous", label: "Androgynous / fluid" },
        { value: "surprise", label: "No" },
      ],
    },
  ]

  // Handle option selection
  const handleOptionSelect = (value: string) => {
    const currentField = steps[currentStep].id
    setFormData({
      ...formData,
      [currentField]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      const formDataToSend = new FormData();
      
      // Add prompt
      const godMatch = matchGod(formData);
      const prompt = `Greek god ${godMatch.name} with ${godMatch.visual}`;
      formDataToSend.append('prompt', prompt);
      
      // Add ONLY the one image stored in formData.image
      if (formData.image) {
        // Convert base64 to file
        const imageData = formData.image.split(',')[1];
        const blob = new Blob([Buffer.from(imageData, 'base64')], { type: 'image/png' });
        const file = new File([blob], 'user-image.png', { type: 'image/png' });
        
        // Add the SINGLE image
        formDataToSend.append('images', file);
      } else {
        throw new Error('Please upload an image first');
      }
      
      const response = await fetch('/api/image-generation', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (!response.ok) {
        throw new Error('Failed to edit image');
      }
      
      const data = await response.json();
      
      // This is a data:image/png;base64,... string from the API
      setResult(data.imageUrl);
      setShowCard(true);
      
    } catch (error) {
      console.error('Error:', error);
      setShowCard(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({
            ...formData,
            image: event.target.result as string,
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Navigation functions
  const goToNextStep = (e: React.FormEvent) => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Generate the card when all steps are completed
      handleSubmit(e);
      setShowCard(true)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Get background color based on current step
  const getStepColor = () => {
    const colors = [
      "bg-gradient-to-br from-pink-50 to-fuchsia-100", // Image upload
      "bg-gradient-to-br from-amber-50 to-yellow-100", // Strength
      "bg-gradient-to-br from-purple-50 to-violet-100", // Weakness
      "bg-gradient-to-br from-emerald-50 to-green-100", // Social Vibe
      "bg-gradient-to-br from-blue-50 to-cyan-100", // Weapon
      "bg-gradient-to-br from-teal-50 to-cyan-100", // Gender
    ]
    return colors[currentStep] || colors[0]
  }

  // Generate stats based on user answers
  const generateStats = () => {
    // Base stats
    let power = 50
    let wisdom = 50
    let charisma = 50
    let cunning = 50
    let endurance = 50

    // Adjust based on strength
    if (formData.strength === "leadership") power += 30
    if (formData.strength === "strategy") wisdom += 30
    if (formData.strength === "creativity") charisma += 20
    if (formData.strength === "chaosEnergy") power += 20
    if (formData.strength === "hotness") charisma += 30
    if (formData.strength === "resilience") endurance += 30
    if (formData.strength === "persuasion") cunning += 30

    // Adjust based on weapon
    if (formData.weapon === "lightning") power += 20
    if (formData.weapon === "bow") cunning += 15
    if (formData.weapon === "sword") power += 15
    if (formData.weapon === "mirror") charisma += 15
    if (formData.weapon === "fire") power += 15
    if (formData.weapon === "lyre") charisma += 20
    if (formData.weapon === "poison") cunning += 20

    // Cap at 100
    return {
      power: Math.min(power, 100),
      wisdom: Math.min(wisdom, 100),
      charisma: Math.min(charisma, 100),
      cunning: Math.min(cunning, 100),
      endurance: Math.min(endurance, 100),
    }
  }

  // Generate a description based on user answers
  const generateDescription = () => {
    const god = matchGod(formData)
    const { strength, weakness, socialVibe } = formData

    let description = `With the divine essence of ${god.name}, `

    // Add strength
    if (strength === "leadership") description += "you command respect and authority. "
    if (strength === "strategy") description += "your wisdom guides your decisions. "
    if (strength === "creativity") description += "you bring beauty and art into the world. "
    if (strength === "chaosEnergy") description += "you thrive in disorder and unpredictability. "
    if (strength === "hotness") description += "your beauty is legendary among mortals and gods alike. "
    if (strength === "resilience") description += "you endure challenges that would break lesser beings. "
    if (strength === "persuasion") description += "your words can sway even the most stubborn hearts. "

    // Add social vibe
    if (socialVibe === "leader") description += "You naturally take command in any gathering. "
    if (socialVibe === "chaosAgent") description += "Your presence brings excitement and unpredictability. "
    if (socialVibe === "observer") description += "You see all while revealing little of yourself. "
    if (socialVibe === "smoothTalker") description += "Your silver tongue wins friends and influences people. "
    if (socialVibe === "peacemaker") description += "You bring harmony to even the most contentious situations. "
    if (socialVibe === "wildCard") description += "No one ever knows what you'll do next. "

    // Add weakness
    if (weakness === "jealousy") description += "But beware the green-eyed monster that lurks within."
    if (weakness === "pride") description += "Yet hubris may be your undoing."
    if (weakness === "overthinking") description += "Though your mind sometimes becomes your prison."
    if (weakness === "impulsiveness") description += "However, acting without thought leads to peril."
    if (weakness === "vengefulness") description += "Still, your desire for retribution can consume you."
    if (weakness === "indecision") description += "Yet hesitation at crucial moments may cost you dearly."

    return description
  }

  // Current step data
  const currentStepData = steps[currentStep]
  const isImageStep = currentStepData.id === "image"
  const isLastStep = currentStep === steps.length - 1

  // Check if current step has been answered
  const isCurrentStepAnswered = () => {
    const currentField = steps[currentStep].id
    return formData[currentField as keyof typeof formData] !== ""
  }

  return (
    <div className={`min-h-screen py-8 px-4 ${getStepColor()}`}>
      <div className="container mx-auto max-w-md">
        {!showCard ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-2">Top Trump Generator</h1>
            <h2 className="text-2xl font-semibold text-center mb-8">Greek Myths Edition 🏛️</h2>
            <p className="text-center mb-8 text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </p>

            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
                <p className="text-gray-600">{currentStepData.description}</p>
              </CardHeader>

              <CardContent>
                {isImageStep ? (
                  <div className="flex flex-col items-center space-y-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    {formData.image ? (
                      <div className="relative w-48 h-48 rounded-lg overflow-hidden">
                        <Image
                          src={formData.image || "/placeholder.svg"}
                          alt="Uploaded selfie"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Upload className="h-12 w-12 text-gray-400" />
                      </div>
                    )}

                    <Button onClick={triggerFileInput} className="mt-4">
                      {formData.image ? "Change Image" : "Upload Selfie"}
                    </Button>
                  </div>
                ) : (
                  <RadioGroup
                    name={currentStepData.id}
                    value={formData[currentStepData.id as keyof typeof formData] as string}
                    onValueChange={handleOptionSelect}
                    className="space-y-3"
                  >
                    {currentStepData.options?.map((option) => (
                      <div
                        key={option.value}
                        className="relative"
                      >
                        <input
                          type="radio"
                          id={option.value}
                          name={currentStepData.id}
                          value={option.value}
                          checked={formData[currentStepData.id as keyof typeof formData] === option.value}
                          onChange={() => handleOptionSelect(option.value)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={option.value}
                          className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50 cursor-pointer transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:hover:bg-blue-100"
                        >
                          <div className="flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 shrink-0">
                            <div className={`w-3 h-3 rounded-full bg-blue-500 transition-transform duration-200 ${formData[currentStepData.id as keyof typeof formData] === option.value ? 'scale-100' : 'scale-0'}`} />
                          </div>
                          <span className="flex-grow">{option.label}</span>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <div className="flex w-full gap-2">
                <Button 
  type="button" 
  onClick={goToNextStep} 
  disabled={!isCurrentStepAnswered() || loading} 
  className="flex-1"
>
  {isLastStep ? (
    loading ? (
      <div className="flex items-center">
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Generating...
      </div>
    ) : (
      <>
        Generate <Sparkles className="ml-2 h-4 w-4" />
      </>
    )
  ) : (
    <>
      Next <ArrowRight className="ml-2 h-4 w-4" />
    </>
  )}
</Button>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </CardFooter>
            </Card>
          </>
        ) : (
          // Top Trump Card Display
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-6">Your Greek Myth Top Trump</h1>

            <Card className={`relative w-full max-w-sm shadow-2xl border-4 ${getCardColors(matchGod(formData), formData).border} rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-gray-800`}>
              {/* Metallic Header */}
              <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-3 flex flex-col items-center border-b-4 border-yellow-700 shadow-md">
                <span className="text-xs font-bold tracking-widest text-gray-900 uppercase mb-1 font-fun">DIVINE NAME</span>
                <h2 className="text-2xl font-extrabold text-white drop-shadow-lg tracking-wider uppercase font-fun">{matchGod(formData).name}</h2>
              </div>

              {result && !loading ? (
                <div className="relative w-full h-64">
                  <Image 
                    src={result}
                    alt="Generated image" 
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="relative w-full h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full size-12 border-y-2 border-white"></div>
                  </div>
                </div>
              )}

              {/* Stat Bars */}
              <div className="px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-800 border-b-2 border-gray-700">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-yellow-300 tracking-wide mb-1 uppercase font-fun">Divine Stats</h3>
                  {Object.entries(generateStats()).map(([stat, value], idx) => {
                    // Assign a color for each stat bar
                    const statColors = [
                      "bg-blue-400", // power
                      "bg-green-400", // wisdom
                      "bg-pink-400", // charisma
                      "bg-purple-400", // cunning
                      "bg-orange-400", // endurance
                    ];
                    return (
                      <div key={stat} className="flex items-center mb-1">
                        <span className="w-24 text-xs font-bold text-gray-200 uppercase tracking-wider font-fun">{stat}</span>
                        <span className="w-8 text-right text-xs font-bold text-yellow-200 font-fun">{value}</span>
                        <div className="flex-1 ml-2 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`${statColors[idx % statColors.length]} h-3 rounded-full`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description Box */}
              <div className="px-4 py-3 bg-gradient-to-br from-yellow-700 to-yellow-900">
                <div className="rounded-md bg-yellow-800/80 p-2 shadow-inner">
                  <h3 className="text-xs font-bold text-yellow-300 uppercase mb-1 tracking-widest font-fun">Divine Essence</h3>
                  <p className="text-sm text-yellow-100 leading-tight">{generateDescription()}</p>
                </div>
              </div>

              {/* Card Border Accent */}
              <div className="absolute inset-0 pointer-events-none border-4 border-yellow-400 rounded-xl" style={{ boxShadow: '0 0 16px 4px #facc15, 0 2px 8px #0008' }}></div>
            </Card>

            <Button
              onClick={() => {
                setShowCard(false)
                setCurrentStep(0)
                setFormData({
                  strength: "",
                  weakness: "",
                  socialVibe: "",
                  weapon: "",
                  gender: "",
                  image: null,
                })
                setResult(null)
              }}
              className="mt-8"
            >
              Create Another Card
            </Button>
          </div>
        )}
      </div>
    </div>
    
  )
}
