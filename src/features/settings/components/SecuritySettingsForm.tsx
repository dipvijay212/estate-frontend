'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, passwordSchema, ProfileFormData, PasswordFormData } from '../validation/securitySchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { 
  Loader2, Save, UserCircle, Key, Shield, LogOut, 
  Trash2, UploadCloud, Smartphone, AlertTriangle
} from 'lucide-react';

export function SecuritySettingsForm() {
  const router = useRouter();
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const { 
    register: registerProfile, 
    handleSubmit: handleSubmitProfile, 
    formState: { errors: profileErrors, isDirty: isProfileDirty } 
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'Admin User',
      email: 'admin@realtyflow.com'
    },
    mode: 'onChange'
  });

  const { 
    register: registerPassword, 
    handleSubmit: handleSubmitPassword, 
    reset: resetPassword,
    formState: { errors: passwordErrors, isDirty: isPasswordDirty } 
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange'
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsSubmittingProfile(true);
    setTimeout(() => {
      setIsSubmittingProfile(false);
      toast.success('Profile information updated!');
    }, 1200);
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsSubmittingPassword(true);
    setTimeout(() => {
      setIsSubmittingPassword(false);
      resetPassword();
      toast.success('Password changed successfully!');
    }, 1500);
  };

  const handleLogout = () => {
    toast.info('Logging out...');
    setTimeout(() => {
      // Mock logout redirect
      router.push('/');
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion initiated (Mock).');
    }
  };

  const mockUpload = () => {
    toast.info('Uploading avatar...');
    setTimeout(() => {
      setAvatarUploaded(true);
      toast.success('Avatar updated.');
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      
      <div className="xl:col-span-2 space-y-8">
        
        {/* Profile Information Section */}
        <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
          <div className="bg-muted/30 p-6 border-b flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2"><UserCircle className="w-5 h-5 text-primary" /> Profile Information</h2>
              <p className="text-muted-foreground text-sm mt-1">Update your personal details and avatar.</p>
            </div>
          </div>

          <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0 flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden">
                  {avatarUploaded ? (
                    <img src="https://i.pravatar.cc/150?u=admin" alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle className="w-12 h-12 text-primary/50" />
                  )}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={mockUpload}>
                  <UploadCloud className="w-4 h-4 mr-2" /> Change
                </Button>
              </div>

              <div className="flex-1 space-y-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="John Doe" {...registerProfile('fullName')} />
                    {profileErrors.fullName && <p className="text-destructive text-sm">{profileErrors.fullName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input type="email" placeholder="john@example.com" {...registerProfile('email')} />
                    {profileErrors.email && <p className="text-destructive text-sm">{profileErrors.email.message}</p>}
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isSubmittingProfile || !isProfileDirty}>
                    {isSubmittingProfile ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                    ) : (
                      <><Save className="w-4 h-4 mr-2" /> Save Profile</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
          <div className="bg-muted/30 p-6 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2"><Key className="w-5 h-5 text-amber-500" /> Change Password</h2>
            <p className="text-muted-foreground text-sm mt-1">Ensure your account is using a long, random password to stay secure.</p>
          </div>

          <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="p-6 md:p-8 space-y-6">
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium">Current Password</label>
              <Input type="password" {...registerPassword('currentPassword')} />
              {passwordErrors.currentPassword && <p className="text-destructive text-sm">{passwordErrors.currentPassword.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" {...registerPassword('newPassword')} />
                {passwordErrors.newPassword && <p className="text-destructive text-sm">{passwordErrors.newPassword.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input type="password" {...registerPassword('confirmPassword')} />
                {passwordErrors.confirmPassword && <p className="text-destructive text-sm">{passwordErrors.confirmPassword.message}</p>}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button type="submit" variant="secondary" disabled={isSubmittingPassword || !isPasswordDirty}>
                {isSubmittingPassword ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...</>
                ) : (
                  <><Key className="w-4 h-4 mr-2" /> Update Password</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column: Security & Actions */}
      <div className="xl:col-span-1 space-y-6">
        
        {/* Two-Factor Authentication */}
        <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold flex items-center gap-2"><Shield className="w-5 h-5 text-indigo-500" /> Two-Factor Auth</h2>
            <p className="text-muted-foreground text-sm mt-1">Add an extra layer of security to your account.</p>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-500">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Authenticator App</p>
                <p className="text-sm text-muted-foreground">Not configured</p>
              </div>
            </div>
            <Button 
              className="w-full" 
              variant={is2FAEnabled ? "outline" : "default"}
              onClick={() => {
                toast.success(is2FAEnabled ? '2FA Disabled.' : '2FA Setup Initiated (Mock).');
                setIs2FAEnabled(!is2FAEnabled);
              }}
            >
              {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-2xl shadow-sm border border-destructive/20 overflow-hidden">
          <div className="p-6 border-b border-destructive/10 bg-destructive/5">
            <h2 className="text-lg font-bold flex items-center gap-2 text-destructive"><AlertTriangle className="w-5 h-5" /> Danger Zone</h2>
          </div>
          <div className="p-6 space-y-4">
            
            <div>
              <p className="font-semibold mb-1">Session Management</p>
              <p className="text-sm text-muted-foreground mb-3">Log out of your current session securely.</p>
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="font-semibold mb-1 text-destructive">Delete Account</p>
              <p className="text-sm text-muted-foreground mb-3">Permanently remove your account and all data.</p>
              <Button variant="destructive" className="w-full justify-start" onClick={handleDeleteAccount}>
                <Trash2 className="w-4 h-4 mr-2" /> Delete Account
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
