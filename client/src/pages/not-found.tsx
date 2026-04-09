import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="border-border/50 max-w-md w-full">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-400 opacity-60" />
          <h1 className="text-lg font-bold mb-2">Page Not Found</h1>
          <p className="text-sm text-muted-foreground mb-4">
            This page doesn't exist. It may have been moved or the URL is incorrect.
          </p>
          <Link href="/">
            <span className="text-sm text-primary hover:underline cursor-pointer">Back to Dashboard</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
