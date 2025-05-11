"use client"

import { ArrowLeft, ArrowRight, Upload, Sparkles } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import type React from "react"

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

  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Define the steps/questions
  const steps = [
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
      id: "image",
      title: "Upload your image 📸",
      description: "This will be used for your Top Trump card",
      type: "image",
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
      "bg-gradient-to-br from-amber-50 to-yellow-100", // Strength
      "bg-gradient-to-br from-purple-50 to-violet-100", // Weakness
      "bg-gradient-to-br from-emerald-50 to-green-100", // Activity
      "bg-gradient-to-br from-blue-50 to-cyan-100", // Social Vibe
      "bg-gradient-to-br from-red-50 to-rose-100", // Weapon
      "bg-gradient-to-br from-pink-50 to-fuchsia-100", // Love Life
      "bg-gradient-to-br from-gray-50 to-slate-100", // Downfall
      "bg-gradient-to-br from-orange-50 to-amber-100", // Image
      "bg-gradient-to-br from-teal-50 to-cyan-100", // Gender
    ]
    return colors[currentStep] || colors[0]
  }

  // Determine which Greek god/goddess matches the user based on their answers
  const determineGodMatch = () => {
    // This is a simplified matching algorithm
    const { strength, weapon, socialVibe } = formData

    // Primary matching based on strength and weapon
    if (strength === "leadership" || weapon === "lightning") return "Zeus"
    if (strength === "strategy" || weapon === "sword") return "Athena"
    if (strength === "creativity" || weapon === "lyre") return "Apollo"
    if (strength === "hotness") return "Aphrodite"
    if (weapon === "sword") return "Ares"
    if (weapon === "bow") return "Artemis"
    if (strength === "chaosEnergy") return "Dionysus"
    if (strength === "persuasion") return "Hermes"
    if (socialVibe === "observer") return "Hades"

    // Default fallbacks
    if (formData.gender === "masculine") return "Poseidon"
    if (formData.gender === "feminine") return "Demeter"

    // Ultimate fallback
    return "Hera"
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
    const god = determineGodMatch()
    const { strength, weakness, socialVibe } = formData

    let description = `With the divine essence of ${god}, `

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
                        className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50"
                      >
                        <RadioGroupItem value={option.value} />
                        <Label htmlFor={option.value} className="flex-grow cursor-pointer">
                          {option.label}
                        </Label>
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
                <h2 className="text-xl font-bold text-center">{determineGodMatch()}</h2>
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
