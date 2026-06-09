import Hero from '../components/Hero'
import PatternCard from '../components/PatternCard'
import { patterns } from '../data/patterns'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Explore the Patterns
          </h2>
          <p className="text-surface-400 mb-10 max-w-xl">
            Each pattern page includes a concept overview, interactive demo, before/after code,
            and a decision framework for when to use it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patterns.map((pattern, i) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <PatternCard pattern={pattern} index={i} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 border-t border-surface-800">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Why Design Patterns?
          </h2>
          <p className="text-surface-400 leading-relaxed">
            Design patterns are proven solutions to recurring problems in software architecture.
            In React, they help you write code that is more reusable, testable, and maintainable.
            Whether you're building a component library or a large-scale application,
            understanding these patterns will level up your React skills.
          </p>
        </motion.div>
      </section>
    </div>
  )
}