import Image from "next/image";
import { resumeData } from "@/data/resume";

export default function Education() {
  return (
    <section id="education" className="py-24 border-t border-white/5">
      <h2 className="text-4xl md:text-6xl font-black heading-font mb-12">
        Education
      </h2>
      <div className="flex flex-col gap-6">
        {resumeData.education.map((edu, idx) => (
          <div key={idx} className="bento-card p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo Column */}
              <div className="shrink-0">
                <div className="w-14 h-14 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={edu.logo}
                    className="object-contain"
                    alt={edu.school}
                    fill
                  />
                </div>
              </div>

              {/* Details Column */}
              <div className="flex-1">
                {/* Header */}
                <div className={`flex flex-col md:flex-row md:justify-between md:items-start gap-4 ${edu.degrees.length > 0 ? 'mb-8' : ''}`}>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {edu.school}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center px-3 py-1 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <span className="text-sm font-bold text-blue-400 leading-none">
                          {edu.gpa}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {edu.honors}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end text-xs font-mono text-slate-400 uppercase tracking-[0.1em] shrink-0 pt-1.5">
                    <span className="uppercase">{edu.duration}</span>
                    {edu.location && <span>{edu.location}</span>}
                  </div>
                </div>

                {edu.degrees.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {edu.degrees.map((degree, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-white/10 transition-colors group"
                      >
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 block">
                          {degree.school}
                        </span>
                        <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                          {degree.degree}
                        </h4>
                        <p className="text-slate-400 text-sm mt-2">
                          {degree.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}