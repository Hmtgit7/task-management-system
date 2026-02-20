'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, UserPlus, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';
import { useRegister } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const passwordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const strengthConfig = [
  { label: 'Weak', color: 'bg-destructive' },
  { label: 'Fair', color: 'bg-orange-500' },
  { label: 'Good', color: 'bg-yellow-500' },
  { label: 'Strong', color: 'bg-green-500' },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate: register_, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch('password', '');
  const strength = passwordStrength(passwordValue);
  const strengthInfo = strengthConfig[Math.min(strength - 1, 3)];

  const onSubmit = (data: RegisterFormData) => {
    register_({
      name: data.name || undefined,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="w-full max-w-md">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Card className="border-border/60 shadow-xl">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserPlus className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
          <CardDescription className="text-center">
            Start managing tasks for free — no card required
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">
                Full name <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                disabled={isPending}
                className={cn(
                  'h-11',
                  errors.name && 'border-destructive focus-visible:ring-destructive'
                )}
                {...register('name')}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isPending}
                className={cn(
                  'h-11',
                  errors.email && 'border-destructive focus-visible:ring-destructive'
                )}
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  disabled={isPending}
                  className={cn(
                    'h-11 pr-10',
                    errors.password && 'border-destructive focus-visible:ring-destructive'
                  )}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Password strength indicator */}
              {passwordValue.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1.5 flex-1 rounded-full transition-all duration-300',
                          i < strength ? strengthInfo?.color : 'bg-muted'
                        )}
                      />
                    ))}
                  </div>
                  <p
                    className={cn(
                      'text-xs',
                      strength <= 1 && 'text-destructive',
                      strength === 2 && 'text-orange-500',
                      strength === 3 && 'text-yellow-500',
                      strength === 4 && 'text-green-500'
                    )}
                  >
                    {strengthInfo?.label || 'Too short'} password
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  disabled={isPending}
                  className={cn(
                    'h-11 pr-10',
                    errors.confirmPassword && 'border-destructive focus-visible:ring-destructive'
                  )}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full h-11 mt-2" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-0">
          <Separator />

          {/* Perks */}
          {/* <div className="grid grid-cols-2 gap-1.5 w-full">
            {[
              "Free forever",
              "No credit card",
              "Unlimited tasks",
              "Dark mode",
            ].map((perk) => (
              <div
                key={perk}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                {perk}
              </div>
            ))}
          </div> */}

          <Separator />

          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
