'use client';

import type { Dispatch, SetStateAction } from "react";
import type { Product } from "@/lib/definitions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "@/hooks/use-translation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

export interface Filters {
    categories: string[];
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
}

interface ProductFiltersProps {
    products: Product[];
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
    sortOption: SortOption;
    setSortOption: Dispatch<SetStateAction<SortOption>>;
}

export function ProductFilters({ products, filters, setFilters, sortOption, setSortOption }: ProductFiltersProps) {
    const { t } = useTranslation();

    const allCategories = Array.from(new Set(products.map(p => p.category)));
    const allSizes = Array.from(new Set(products.flatMap(p => p.options?.sizes || [])));
    const allColors = Array.from(new Set(products.flatMap(p => p.options?.colors || [])));

    const handleCheckedChange = (type: 'categories' | 'sizes' | 'colors', value: string) => {
        setFilters(prev => {
            const currentValues = prev[type];
            if (currentValues.includes(value)) {
                return { ...prev, [type]: currentValues.filter(v => v !== value) };
            } else {
                return { ...prev, [type]: [...currentValues, value] };
            }
        });
    };
    
    const maxPrice = Math.max(...products.map(p => p.price), 3500);

    return (
        <div className="sticky top-24 space-y-8">
            <div>
                <h3 className="text-lg font-semibold mb-4">{t('filters.sort_by')}</h3>
                 <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder={t('filters.sort_by')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">{t('filters.newest')}</SelectItem>
                        <SelectItem value="price-asc">{t('filters.price_asc')}</SelectItem>
                        <SelectItem value="price-desc">{t('filters.price_desc')}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        
            <Accordion type="multiple" defaultValue={['categories', 'price', 'sizes']} className="w-full">
                <AccordionItem value="categories">
                    <AccordionTrigger className="text-lg font-semibold">{t('filters.categories')}</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        {allCategories.map(category => (
                            <div key={category} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`cat-${category}`} 
                                    checked={filters.categories.includes(category)}
                                    onCheckedChange={() => handleCheckedChange('categories', category)}
                                />
                                <Label htmlFor={`cat-${category}`} className="capitalize">{t(`categories.${category}`)}</Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                    <AccordionTrigger className="text-lg font-semibold">{t('filters.price')}</AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <Slider
                            min={0}
                            max={maxPrice}
                            step={50}
                            value={filters.priceRange}
                            onValueChange={(value) => setFilters(f => ({...f, priceRange: [value[0], value[1]]}))}
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                            <span>{filters.priceRange[0]} €</span>
                            <span>{filters.priceRange[1]} €</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sizes">
                    <AccordionTrigger className="text-lg font-semibold">{t('filters.sizes')}</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        {allSizes.map(size => (
                             <div key={size} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`size-${size}`} 
                                    checked={filters.sizes.includes(size)}
                                    onCheckedChange={() => handleCheckedChange('sizes', size)}
                                />
                                <Label htmlFor={`size-${size}`}>{size}</Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                
                 <AccordionItem value="colors">
                    <AccordionTrigger className="text-lg font-semibold">{t('filters.colors')}</AccordionTrigger>
                    <AccordionContent className="flex flex-wrap gap-2 pt-2">
                        {allColors.map(color => (
                             <button
                                key={color}
                                onClick={() => handleCheckedChange('colors', color)}
                                className={`w-8 h-8 rounded-full border-2 ${filters.colors.includes(color) ? 'border-primary' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                                aria-label={color}
                            />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
