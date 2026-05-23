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
import { createJobPost } from "@/features/jobs/server/jobs.action";
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
  Loader,
} from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EmployerJobForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: "",
      description: "",

      jobType: undefined,
      workType: undefined,
      jobLevel: undefined,

      location: "",
      tags: "",

      minSalary: "",
      maxSalary: "",
      salaryCurrency: undefined,
      salaryPeriod: undefined,

      minEducation: undefined,
      experience: "",
      expiresAt: "",
    },
  });

  const handleFormSubmit = async (data: JobPostData) => {
    console.log("Jobs Data: ", data);
    const response = await createJobPost(data);
    if (response.status == "SUCCESS") {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <Card className="w-3/4">
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="title"
                type="text"
                placeholder="e.g., Senior Frontend Developer"
                className={`pl-10 ${errors.title ? "border-destructive" : ""}`}
                {...register("title")}
              />
            </div>
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
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
              <Controller
                name="workType"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                    >
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
                )}
              />
              {errors.workType && (
                <p className="text-sm text-destructive">
                  {errors.workType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobLevel">Job Level *</Label>
              <Controller
                name="jobLevel"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                    >
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
                )}
              />
              {errors.jobLevel && (
                <p className="text-sm text-destructive">
                  {errors.jobLevel.message}
                </p>
              )}
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
            <Button type="submit">
              {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Job Posting..." : "Post Job"}
            </Button>
            {!isDirty && (
              <p className="text-sm text-muted-foreground">
                No changes to save
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
