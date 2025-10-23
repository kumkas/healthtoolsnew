import * as React from "react"
import { 
  Heart, 
  Activity, 
  Calculator, 
  Scale, 
  Baby, 
  Moon, 
  Droplets, 
  Zap, 
  Flame,
  BarChart3,
  Users,
  Apple,
  Brain,
  Dumbbell,
  type LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Activity,
  Calculator,
  Scale,
  Baby,
  Moon,
  Droplets,
  Zap,
  Flame,
  BarChart3,
  Users,
  Apple,
  Brain,
  Dumbbell,
  Calendar: Baby, // Fallback for Calendar
  HeartPulse: Activity, // Fallback for HeartPulse
}

interface HealthIconProps {
  name: string
  className?: string
  size?: number
}

const HealthIcon: React.FC<HealthIconProps> = ({ 
  name, 
  className,
  size = 24
}) => {
  const IconComponent = iconMap[name] || Heart // Default fallback
  
  return (
    <IconComponent 
      size={size}
      className={cn("text-current", className)}
    />
  )
}

export { HealthIcon }