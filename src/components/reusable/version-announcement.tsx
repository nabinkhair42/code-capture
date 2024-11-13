import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ConfettiButton } from "@/components/ui/addons/confetti";
import { BorderBeam } from "../ui/addons/border-bean";

const VersionAnnouncement = () => {
  return (
    <ConfettiButton className="bg-inherit border rounded-full hover:bg-inherit w-fit px-4 text-primary relative">
      
        <p>✨ Introducing Code Capture</p>
        <Separator orientation="vertical" />
        <p> v.1.0</p>
        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      <BorderBeam />
    </ConfettiButton>
  );
};

export default VersionAnnouncement;
