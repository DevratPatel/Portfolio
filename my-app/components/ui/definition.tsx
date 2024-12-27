import React from "react";

export function DefinitionHover() {
  return (
    <div>
      <div className="text-white/70 text-[22px] font-light font-['DM Sans']">
        /dev: vrat/
      </div>
      {/* 1) The main definition (visible by default, hidden on hover) */}
      <div className="opacity-100 group-hover/actually:opacity-0 transition-opacity duration-300">
        <div>
          <div className="text-white/50 text-[22px] font-light italic font-['DM Sans'] mt-3 mb-0">
            noun
          </div>
          <div className="text-white/80 text-[22px] font-light font-['DM Sans']">
            President of ACM at UTA
          </div>
          <div className="text-white/50 text-[22px] font-light italic font-['DM Sans'] mt-3 mb-0">
            verb
          </div>
          <div className="text-white/80 text-[22px] font-light font-['DM Sans']">
            1. Create and innovate <br />
            2. Influence and inspire
          </div>
          <div className="text-white/50 text-[22px] font-light italic font-['DM Sans'] mt-3 mb-0">
            adjective
          </div>
          <div className="text-white/80 text-[22px] font-light font-['DM Sans']">
            1. Persistent, detail-oriented
          </div>
        </div>
      </div>

      {/* 2) The "Nothing defines me..." text (hidden by default, visible on hover) */}
      <div className=" absolute top-0 left-0 opacity-0 group-hover/actually:opacity-100 transition-opacity duration-300">
        <div className="text-white/80 text-[40px] font-light font-['DM Sans'] mt-10">
          Nothing defines me. LOL
        </div>
      </div>
    </div>
  );
}
