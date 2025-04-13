import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-150px)] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Fun SVG illustration of a guitar with a broken string */}
      <div className="relative mb-6">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl font-bold tracking-tighter text-secondary/90">
          404
        </div>
        <div className="h-72 w-72">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 280 280"
            className="h-full w-full text-secondary"
          >
            <title>Broken Guitar 404</title>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {/* Guitar body */}
              <path d="M120,180 Q160,200 200,180 Q220,155 200,120 Q160,100 120,120 Q100,155 120,180 Z" fill="rgba(255,176,0,0.1)" />
              
              {/* Guitar neck */}
              <path d="M120,150 L60,80" strokeWidth="4" />
              
              {/* Tuning pegs */}
              <circle cx="50" cy="70" r="5" fill="currentColor" />
              <circle cx="40" cy="60" r="5" fill="currentColor" />
              <circle cx="60" cy="55" r="5" fill="currentColor" />
              
              {/* Broken string - zigzag */}
              <path d="M130,140 L110,120 L125,105 L110,90 L125,75" strokeDasharray="3,3" className="animate-pulse" />
              
              {/* Other strings */}
              <line x1="140" y1="150" x2="70" y2="75" />
              <line x1="150" y1="160" x2="80" y2="85" />
              
              {/* Sound hole */}
              <circle cx="160" cy="150" r="15" />
              
              {/* Guitar bridge */}
              <rect x="140" y="170" width="40" height="5" rx="2" />
            </g>
            
            {/* Animation for broken string */}
            <g opacity="0.7">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 140 140"
                to="5 140 140"
                dur="2s"
                repeatCount="indefinite"
                additive="sum"
              />
            </g>
          </svg>
        </div>
      </div>

      <h1 className="mt-8 text-4xl font-bold text-secondary">Oops! This Note Doesn't Exist</h1>
      
      <p className="mt-4 max-w-md text-xl text-muted-foreground">
        Looks like this riff hit a sour note. The page you're looking for seems to have 
        left the stage.
      </p>
      
      <div className="mt-8 flex items-center gap-4">
        <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Link href="/">
            Back to the Main Stage
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="lg">
          <Link href="/events">
            See Upcoming Shows
          </Link>
        </Button>
      </div>
      
      <p className="mt-12 text-sm text-muted-foreground/60">
        Error Code: 404 - Page Not Found
      </p>
    </div>
  )
} 