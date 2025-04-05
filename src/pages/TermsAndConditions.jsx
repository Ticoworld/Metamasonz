import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TermsAndConditions = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Cosmic particle animation variants
  const starVariants = {
    twinkle: {
      opacity: [0, 1, 0],
      scale: [1, 1.5, 1],
      transition: {
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="relative py-24 bg-gray-50 dark:bg-black overflow-hidden"
      ref={ref}
    >
      {/* Cosmic Background Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "url('/image5.jpg') no-repeat center center",
          backgroundSize: "cover",
          opacity: 0.2,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cosmic Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-300/50 dark:bg-purple-400/30 rounded-full"
            style={{
              width: Math.random() * 4 + "px",
              height: Math.random() * 4 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            variants={starVariants}
            animate="twinkle"
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-800 dark:text-cyan-200 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Last updated: March 2, 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-800/20"
        >
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4">
              Agreement to Terms
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              When you work with @Metamasonz—whether through our website at
              metamasonz.com, a quick message, or by hiring us—you're agreeing
              to these terms. They cover everything we do together, alongside
              any specific deal we put in writing. If these rules don't sit
              right with you, that's fine—just don't use our services.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              Our Services
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              We're not just service providers; we're builders. We know what it
              takes to succeed in Web3, and we bring the passion, time,
              leverage, and community that many founders don't have. Our mission
              is to help you achieve your goal of building a thriving project,
              no matter the stage you're in. We love working with startups,
              helping them build exceptional Web3 projects for long-term
              success.
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              That means we offer a lot—building tech like apps or tools,
              boosting projects with shilling, raiding, and DEX votes, handling
              marketing through campaigns or hosting spaces, designing graphics,
              videos, and websites, managing projects with moderation or
              partnerships, and even advising with KOLs, content writing,
              testing, and more. We don't promise your project will
              skyrocket—Web3's too unpredictable for that—but we bring the
              skills to make it solid.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              Pricing and Payment
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Our pricing is straightforward and listed on our website. Every
              service we offer—like tech development, growth boosts, or creative
              work—has its own rate. Some things, like shilling, raiding, and
              voting, come bundled together for one price because they work best
              that way. Tech services might cost a bit more, but everything we
              do is cost-effective, thanks to how our team collaborates. That
              doesn't mean we skimp on quality—it's top-notch, just priced to
              make sense. If we bring in outsiders like KOLs or partners, those
              come with extra fees, and we'll lay it all out for you.
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Payment's a big deal. We need 50% of the total cost upfront before
              we lift a finger, unless we work out something different in
              writing, like through DMs or email. The rest you pay when we're
              done or at steps we agree on. If you're late, we'll pause after a
              week and add 5% extra per week—no refunds for what's already
              finished. Paying in crypto? The price locks when we send the bill,
              and you deal with any ups or downs after that. Bottom line: we
              only work once the money's there.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              Your Responsibilities
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Your part is simple but important. Tell us everything about your
              project—your goals, budget, team setup—right from the start. If
              you leave out details, we can't be held responsible for what
              happens. Keep up with us too—answer our questions or send what we
              need within a couple of days, or it might slow things down. You're
              also in charge of keeping your project legal—we don't handle that.
              And please, don't use our work for anything shady like
              scams—that's a hard stop for us.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              Intellectual Property
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              What we make belongs to us until you pay—like our website,
              designs, or methods. Once you settle up, anything we create for
              your project is yours to use for that project only. We might
              mention our work in passing—like saying we helped a Web3 project
              grow—unless you tell us not to.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              Scope of Work
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              The plan we follow is whatever we write down together. Want to add
              something new? It'll cost more, or we might say no if it's not our
              thing. You get one free tweak on what we deliver—extra changes
              mean extra fees. We can also turn down jobs that don't fit, like
              pushing scams.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              Deadlines and Deliverables
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Deadlines are our best guess. If you drag your feet, they slide.
              We're done when it matches what we agreed—no redo just because
              you're not thrilled, unless we messed up the plan. Need it fast,
              like in under a week? That's a 25% bump in price, agreed upfront.
              For KOLs or partners, we'll connect you with good ones and hold
              the funds—you pick who to use, and if they don't deliver, that's
              not on us. Those extras have their own costs, and we'll be clear
              about them.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              Liability
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              We're not on the hook for big problems. If something goes wrong,
              the most we owe is what you paid us for that job—no huge payouts
              for lost chances or bad vibes. If you ignore our advice or make a
              call that flops, that's your burden, not ours—we're clear of it.
              Web3's messy—market drops or tech glitches aren't our fault
              either. Oh, and we're not your financial or legal gurus—just Web3
              pros helping you build.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              Termination
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              If you want out, give us 7 days' notice and pay for what's
              done—anything unfinished stays with us. We can quit too, right
              away, if you don't pay or break these rules—you still owe what's
              due. If we argue, we'll chat for 2 weeks to fix it. If that fails,
              someone neutral in Nigeria settles it, and we split the cost. Big
              chaos—like network crashes or bans—pauses everything, no
              penalties, until it clears up.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              General
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              We're not your employees or partners—just a hired team doing our
              thing. Don't try to snag our crew for a year after we're
              done—that'll cost you a fee we set. These rules follow Nigerian
              law to keep it straight. If we update them, you'll see it on our
              site, and it'll apply to new work only.
            </p>

            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200 mb-4 mt-8">
              Contact Us
            </h2>
            <p>
              Questions? Hit us at{" "}
              <a
                href="mailto:support.metamasons@gmail.com"
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                support.metamasons@gmail.com
              </a>{" "}
              or{" "}
              <a
                href="https://x.com/Metamasonz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                X
              </a>{" "}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
