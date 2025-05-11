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
    name: "Hermes",
    domains: ["speed", "wit"],
    strengths: ["persuasion", "creativity"],
    weaknesses: ["indecision", "impulsiveness"],
    vibes: ["the smooth talker", "the quiet observer"],
    weapons: ["winged sandals", "staff"],
    visual: {
      masculine: "light traveler robes",
      feminine: "trickster cloak",
      androgynous: "vaporwave courier",
    },
  },
  {
    name: "Dionysus",
    domains: ["wine", "madness", "art"],
    strengths: ["creativity", "chaos energy"],
    weaknesses: ["impulsiveness", "pride"],
    vibes: ["the chaos agent", "the wild card"],
    weapons: ["wine", "fire"],
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
    name: "Zeus",
    domains: ["leadership", "sky"],
    strengths: ["leadership", "power"],
    weaknesses: ["pride", "impulsiveness"],
    vibes: ["the leader"],
    weapons: ["lightning bolt"],
    visual: {
      masculine: "chest out + beard",
      feminine: "thunder goddess robes",
      androgynous: "storm-wrapped titan",
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
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Generate the card when all steps are completed
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
                    variant="outline"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 0}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>

                  <Button type="button" onClick={goToNextStep} disabled={!isCurrentStepAnswered()} className="flex-1">
                    {isLastStep ? (
                      <>
                        Generate <Sparkles className="ml-2 h-4 w-4" />
                      </>
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

            <Card className="w-full max-w-sm shadow-xl border-4 border-amber-600 overflow-hidden">
              <div className="bg-gradient-to-b from-amber-500 to-amber-600 p-3 text-white">
                <h2 className="text-xl font-bold text-center">{matchGod(formData).name}</h2>
                <div className="text-center text-sm text-amber-900 mb-2">{matchGod(formData).visual}</div>
              </div>

              {formData.image && (
                <div className="relative w-full h-64">
                  <Image
                    src={formData.image || "/placeholder.svg"}
                    alt="Your mythological self"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}

              <div className="p-4 bg-amber-50">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Divine Stats</h3>

                  {Object.entries(generateStats()).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between items-center mb-1">
                      <span className="capitalize">{stat}</span>
                      <div className="flex items-center">
                        <span className="mr-2 font-bold">{value}</span>
                        <div className="w-24 bg-gray-200 h-2 rounded-full">
                          <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${value}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Divine Essence</h3>
                  <p className="text-sm">{generateDescription()}</p>
                </div>
              </div>
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
