import { resumeData } from "@/data/resume";
import { GoogleIcon } from "./Icons";

const IconMap: Record<string, React.FC> = {
  google: GoogleIcon,
  // Add other mappings here as needed
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-white/5">
      <h2 className="text-4xl md:text-6xl font-black heading-font mb-12">
        Experience
      </h2>
      <div className="flex flex-col gap-6">
        {resumeData.experience.map((companyData, idx) => {
          const IconComponent = companyData.icon
            ? IconMap[companyData.icon]
            : null;

          return (
            <div key={idx} className="bento-card p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon Column */}
                <div className="shrink-0">
                  <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
                    {companyData.logo ? (
                      <img
                        src={companyData.logo}
                        alt={companyData.company}
                        className="w-full h-full object-contain"
                      />
                    ) : IconComponent ? (
                      <IconComponent />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-500" />
                    )}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        {companyData.company}
                      </h3>
                      {companyData.team && (
                        <p className="text-base font-medium text-blue-400">
                          {companyData.team}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col md:items-end text-xs font-mono text-slate-400 uppercase tracking-[0.1em] shrink-0 pt-1.5">
                      {companyData.duration && <span>{companyData.duration}</span>}
                      <span>{companyData.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-slate-400 leading-relaxed whitespace-pre-line ${companyData.roles.length > 0 ? 'mb-8' : ''}`}>
                    {companyData.description}
                  </p>
                  
                  {/* Roles Progression */}
                  {companyData.roles.length > 0 && (
                    <div className="flex flex-col gap-6 relative">
                      {/* Timeline Line (Only if more than 1 role) */}
                      {companyData.roles.length > 1 && (
                         <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-white/10" />
                      )}

                      {companyData.roles.map((role, rIdx) => (
                        <div key={rIdx} className="relative pl-8">
                          {/* Timeline Dot */}
                          {companyData.roles.length > 1 && (
                              <div className="absolute left-[1px] top-[7px] w-2.5 h-2.5 rounded-full bg-blue-500 box-content border-4 border-[#121212]" /> 
                          )}
                          
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h4 className="text-base font-bold text-white/90">
                              {role.title}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">
                              {role.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}