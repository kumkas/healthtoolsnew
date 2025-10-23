import * as React from "react"
import { motion } from "framer-motion"
import { Heart, Activity, Users, Zap } from "lucide-react"

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Heart */}
      <motion.div
        className="absolute top-20 left-10 text-red-200/30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart size={32} />
      </motion.div>

      {/* Floating Activity */}
      <motion.div
        className="absolute top-40 right-20 text-blue-200/30"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Activity size={28} />
      </motion.div>

      {/* Floating Users */}
      <motion.div
        className="absolute bottom-40 left-20 text-green-200/30"
        animate={{
          y: [0, -25, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Users size={24} />
      </motion.div>

      {/* Floating Zap */}
      <motion.div
        className="absolute bottom-20 right-10 text-yellow-200/30"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Zap size={20} />
      </motion.div>
    </div>
  )
}

export { FloatingElements }