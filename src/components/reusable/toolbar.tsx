"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShareDialog } from "./share-dialog";
import { useToast } from "@/hooks/use-toast";
import { toPng } from "html-to-image";
import {
  Download,
  Copy,
  Settings,
  Palette,
  Image as ImageIcon,
  FileText,
  Link2,
} from "lucide-react";
import { languages } from "@/lib/languages";
import { themes } from "@/lib/themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { generateShareableUrl } from "@/lib/utils";

interface ToolbarProps {
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  background: string;
  setBackground: (background: string) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  lineHeight: number;
  setLineHeight: (lineHeight: number) => void;
  padding: number;
  setPadding: (padding: number) => void;
  showLineNumbers: boolean;
  setShowLineNumbers: (show: boolean) => void;
  code: string;
  editorRef: React.RefObject<HTMLDivElement>;
}

export function Toolbar({
  theme,
  setTheme,
  language,
  setLanguage,
  background,
  setBackground,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  padding,
  setPadding,
  showLineNumbers,
  setShowLineNumbers,
  code,
  editorRef,
}: ToolbarProps) {
  const { toast } = useToast();
  const shareableUrl = generateShareableUrl(code, language, theme);

  const handleCopy = async (type: "text" | "image" | "url") => {
    try {
      switch (type) {
        case "text":
          await navigator.clipboard.writeText(code);
          toast({ title: "Code copied to clipboard!" });
          break;
        case "image":
          if (editorRef.current) {
            const dataUrl = await toPng(editorRef.current, {
              backgroundColor: background,
              style: {
                padding: `${padding}px`,
                borderRadius: "8px",
              },
            });
            const img = new Image();
            img.src = dataUrl;
            await navigator.clipboard.write([
              new ClipboardItem({
                "image/png": await (await fetch(dataUrl)).blob(),
              }),
            ]);
            toast({ title: "Image copied to clipboard!" });
          }
          break;
      }
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "An error occurred while copying.",
        variant: "destructive",
      });
    }
  };
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

  const handleExport = async () => {
    try {
      if (editorRef.current) {
        const dataUrl = await toPng(editorRef.current, {
          backgroundColor: background,
          pixelRatio: 10,
          style: {
            padding: `${padding}px`,
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },

          filter: (node) => {
            return (
              !node.classList?.contains("selected-text") &&
              !node.classList?.contains("cursor") &&
              // remove active lines border
              !node.classList?.contains("line-active")
            );
          },
        });
        const link = document.createElement("a");
        link.download = `code-snippet-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        toast({ title: "Image downloaded successfully!" });
      }
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export the image.",
        variant: "destructive",
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full flex items-center justify-center border-b pb-4">
        <div className="flex flex-wrap gap-2 items-center justify-center w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Select programming language</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Palette className="h-4 w-4 mr-2" />
                      Theme
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {themes.map((t) => (
                      <DropdownMenuItem
                        key={t.value}
                        onClick={() => setTheme(t.value)}
                      >
                        {t.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose editor theme</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center border px-2 py-[1px] rounded justify-around ">
                <span className="text-sm">Background color</span>
                <Input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="border-none w-16 h-8 rounded-lg "
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Set background color</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80">
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-numbers">Show Line Numbers</Label>
                        <Switch
                          id="show-numbers"
                          checked={showLineNumbers}
                          onCheckedChange={setShowLineNumbers}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Font Size</label>
                        <Slider
                          value={[fontSize]}
                          onValueChange={([value]) => setFontSize(value)}
                          min={10}
                          max={20}
                          step={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Line Height
                        </label>
                        <Slider
                          value={[lineHeight * 10]}
                          onValueChange={([value]) => setLineHeight(value / 10)}
                          min={10}
                          max={20}
                          step={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Padding</label>
                        <Slider
                          value={[padding]}
                          onValueChange={([value]) => setPadding(value)}
                          min={16}
                          max={64}
                          step={8}
                        />
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust editor settings</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleCopy("text")}>
                      <FileText className="h-4 w-4 mr-2" />
                      Copy Text
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopy("image")}>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Copy as Image
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyLink}>
                       
                        <Link2 className="h-4 w-4 mr-2" />
                        Copy Link
                       
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy options</p>
            </TooltipContent>
          </Tooltip>

          <ShareDialog code={code} language={language} theme={theme} />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export as image</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
