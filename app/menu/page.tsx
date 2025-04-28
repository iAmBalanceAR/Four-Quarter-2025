"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Utensils, Coffee, Wine } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category?: string;
  tags?: string[];
  isPopular?: boolean;
  isNew?: boolean;
  isVegetarian?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters",
    icon: <Utensils className="h-5 w-5" />,
    items: [
      {
        id: "bruschetta",
        name: "Bruschetta",
        description: "Toasted bread topped with tomatoes, garlic, and fresh basil",
        price: "$8.95",
        tags: ["vegetarian"],
        isPopular: true,
        isVegetarian: true
      },
      {
        id: "calamari",
        name: "Crispy Calamari",
        description: "Lightly fried squid served with marinara sauce",
        price: "$12.95",
        isPopular: true
      },
      {
        id: "carpaccio",
        name: "Beef Carpaccio",
        description: "Thinly sliced raw beef with arugula, capers, and parmesan",
        price: "$14.95"
      },
      {
        id: "caprese",
        name: "Caprese Salad",
        description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
        price: "$10.95",
        isVegetarian: true
      }
    ]
  },
  {
    id: "mains",
    name: "Main Courses",
    icon: <Utensils className="h-5 w-5" />,
    items: [
      {
        id: "pasta-carbonara",
        name: "Pasta Carbonara",
        description: "Spaghetti with pancetta, egg, parmesan, and black pepper",
        price: "$18.95",
        isPopular: true
      },
      {
        id: "risotto",
        name: "Wild Mushroom Risotto",
        description: "Creamy arborio rice with assorted wild mushrooms and truffle oil",
        price: "$19.95",
        isVegetarian: true
      },
      {
        id: "salmon",
        name: "Grilled Salmon",
        description: "Atlantic salmon with lemon butter sauce and seasonal vegetables",
        price: "$24.95"
      },
      {
        id: "steak",
        name: "Ribeye Steak",
        description: "12oz ribeye with garlic mashed potatoes and grilled asparagus",
        price: "$32.95"
      },
      {
        id: "chicken-parm",
        name: "Chicken Parmesan",
        description: "Breaded chicken breast with marinara sauce and melted mozzarella",
        price: "$21.95"
      }
    ]
  },
  {
    id: "drinks",
    name: "Beverages",
    icon: <Coffee className="h-5 w-5" />,
    items: [
      {
        id: "wine-red",
        name: "House Red Wine",
        description: "Glass of our signature red blend",
        price: "$9.95"
      },
      {
        id: "wine-white",
        name: "House White Wine",
        description: "Glass of our signature chardonnay",
        price: "$9.95"
      },
      {
        id: "espresso",
        name: "Espresso",
        description: "Single shot of our premium Italian espresso",
        price: "$3.95"
      },
      {
        id: "cappuccino",
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam",
        price: "$4.95"
      },
      {
        id: "sparkling-water",
        name: "Sparkling Water",
        description: "Bottle of premium sparkling mineral water",
        price: "$4.95"
      }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: <Coffee className="h-5 w-5" />,
    items: [
      {
        id: "tiramisu",
        name: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
        price: "$8.95",
        isPopular: true
      },
      {
        id: "panna-cotta",
        name: "Vanilla Panna Cotta",
        description: "Silky vanilla custard with seasonal berry compote",
        price: "$7.95"
      },
      {
        id: "cannoli",
        name: "Cannoli",
        description: "Crispy pastry shells filled with sweet ricotta cream and chocolate chips",
        price: "$6.95"
      },
      {
        id: "gelato",
        name: "Gelato Selection",
        description: "Choice of three scoops: vanilla, chocolate, pistachio, or strawberry",
        price: "$7.95"
      }
    ]
  }
];

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("starters");

  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative h-[40vh] min-h-[320px] w-full bg-muted mb-12">
        <Image
          src="/images/menu_steak.jpg"
          alt="Steak Menu Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col items-center justify-end h-full">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl drop-shadow-md text-center">Our Menu</h1>
          <p className="text-muted-foreground text-lg mt-2 max-w-2xl text-center drop-shadow-md">
            Discover our carefully crafted dishes made with the freshest ingredients. Our menu changes seasonally to bring you the best flavors.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="starters" className="w-full" onValueChange={setActiveCategory}>
          <TabsList className="flex gap-x-2 bg-[#232B36] border border-border rounded-xl p-1 shadow-md mb-8">
            {menuData.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2 rounded-lg px-5 py-2 font-semibold transition-all duration-200
                  bg-[#232B36] text-muted-foreground border-none
                  hover:bg-[#2C3642] hover:text-foreground
                  data-[state=active]:bg-card data-[state=active]:text-[#FFA726] data-[state=active]:border data-[state=active]:border-[#FFA726] data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:z-10"
              >
                {category.icon}
                <span>{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {menuData.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h2  className="text-[#FFA726] text-2xl font-semibold tracking-tight">{category.name}</h2>
                  {/* <Button variant="outline" size="sm">
                    Download PDF
                  </Button> */}
                </div>
                {/* <Separator /> */}
                
                <div className="grid gap-6 md:grid-cols-2">
                  {category.items.map((item) => (
                    <Card key={item.id} className="overflow-hidden transition-transform duration-200 hover:-translate-y-1 focus:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-semibold">
                            {item.name}
                            {item.isNew && (
                              <Badge className="ml-2 bg-blue-500" variant="secondary">New</Badge>
                            )}
                            {item.isPopular && (
                              <Badge className="ml-2" variant="secondary">Popular</Badge>
                            )}
                          </CardTitle>
                          <span className="font-bold text-lg">{item.price}</span>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-2">
                          {item.isVegetarian && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Vegetarian
                            </Badge>
                          )}
                          {item.tags?.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Special Dietary Requirements?</h3>
          <p className="text-muted-foreground mb-6">
            Please inform your server of any allergies or dietary restrictions.
            We're happy to accommodate your needs whenever possible.
          </p>
          <Button>Contact Us</Button>
        </div>
      </div>
    </>
  );
}

export default MenuPage; 