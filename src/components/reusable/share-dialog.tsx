"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Linkedin, Link2 } from "lucide-react";
import { generateShareableUrl } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ShareDialogProps {
  code: string;
  language: string;
  theme: string;
}

export function ShareDialog({ code, language, theme }: ShareDialogProps) {
  const { toast } = useToast();
  const shareableUrl = generateShareableUrl(code, language, theme);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      toast({
        title: "Link copied!",
        description: "The shareable link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "An error occurred while copying the link.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent("Check out my code snippet created with Code Capture!");
    const url = encodeURIComponent(shareableUrl);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Code Snippet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Share on Twitter
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Share on Facebook
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleShare('linkedin')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                Share on LinkedIn
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleCopyLink}
              >
                <Link2 className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </TooltipTrigger>
      <TooltipContent>
        <p>Share code snippet</p>
      </TooltipContent>
    </Tooltip>
  );
}