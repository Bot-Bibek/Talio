"use client";
import Tiptap from "@/components/TextEditor/text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  JOB_LEVEL,
  JOB_TYPE,
  MIN_EDUCATION,
  SALARY_CURRENCY,
  SALARY_PERIOD,
  WORK_TYPE,
} from "@/config/constant";
import { JobPostData, jobPostSchema } from "@/features/jobs/jobs.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Award,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Tag,
  Currency,
  CalendarRange,
  GraduationCap,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function EmployerJobForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobPostData>({
    resolver: zodResolver(jobPostSchema),
  });
  return (
    <Card className="w-3/4">
      <CardContent>
        <form className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="title"
                type="text"
                placeholder="e.g., Senior Frontend Developer"
                className="pl-10"
              />
            </div>
          </div>

          {/* Job Type, Work Type, Job Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger id="jobType" className="pl-10 w-full">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPE.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workType">Work Type *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger id="workType" className="pl-10 w-full">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_TYPE.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobLevel">Job Level *</Label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger id="jobLevel" className="pl-10 w-full">
                    <SelectValue placeholder="Select job level" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_LEVEL.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location + Tags */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., New York, NY or Remote"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Optional)</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="tags"
                  type="text"
                  placeholder="e.g., React, TypeScript, Node.js"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Min Salary</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="50000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Max Salary</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="80000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <div className="relative">
                <Currency className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger className="pl-10 w-full ">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {SALARY_CURRENCY.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Period</Label>
              <div className="relative">
                <CalendarRange className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger className="pl-10 w-full ">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    {SALARY_PERIOD.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Education + Expiry */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Minimum Education</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select>
                  <SelectTrigger className="pl-10 w-full">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {MIN_EDUCATION.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="date" className="pl-10" />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label>Experience Requirements</Label>
            <div className="relative">
              <Award className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="e.g., 3+ years of React development"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Job Description *</Label>
            <Tiptap content="" />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-4 flex-wrap">
            <Button type="submit" className="w-full md:w-auto">
              Post Job
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
