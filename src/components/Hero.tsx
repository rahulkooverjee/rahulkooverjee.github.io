import { resumeData } from "@/data/resume";
import { GoogleIcon } from "./Icons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center"
    >
      <div className="avatar-circle mb-10 cursor-pointer">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10">
          <img
            src={resumeData.personal.avatar}
            alt={`${resumeData.personal.name} ${resumeData.personal.surname}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h1 className="text-6xl md:text-8xl lg:text-9xl font-black heading-font tracking-tight leading-none mb-6">
        {resumeData.personal.name}{" "}
        <span className="gradient-text">{resumeData.personal.surname}</span>
      </h1>
      <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-12">
        {resumeData.personal.tagline}
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        {resumeData.traits.map((trait, idx) => (
          <div
            key={idx}
            className="trait-card py-5 px-10 rounded-[32px] flex items-center gap-6"
          >
            {trait.icon === "google" && <GoogleIcon />}
            {trait.icon === "penn" && (
              <img
                src="https://sportslogohistory.com/wp-content/uploads/2022/11/penn_quakers_2004-2017_a.png"
                className="w-10 h-10 object-contain shrink-0"
                alt="Penn"
              />
            )}
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[13px] md:text-[14px] font-extrabold uppercase tracking-[0.1em] text-white">
                {trait.title}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mt-1">
                {trait.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
