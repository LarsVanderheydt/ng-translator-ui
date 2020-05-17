import { LocalstorageService } from './../core/services/localstorage.service';
import { SubHandlerService } from './../core/services/subHandler.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap, take, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { PathsService } from '../core/services/paths.service';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [SubHandlerService]
})
export class SettingsComponent implements OnInit {

  public files$ = new BehaviorSubject(null);
  public subDirectories$ = new BehaviorSubject(null);
  public formGroup: FormGroup;

  constructor(
    public pathsService: PathsService,
    private electronService: ElectronService,
    private subService: SubHandlerService,
    private localstorageService: LocalstorageService
  ) { }

  ngOnInit(): void {
    this.initFilesSubscription();
    this.prepareForm();
    this.handleFormChanges();
    this.fillInForm({
      mainDirectory: this.localstorageService.getMainDirectory()
    });
  }

  private initFilesSubscription() {
    this.subService.handleDestroy(this.files$).pipe(tap(files => {
      // console.log(files);
    })).subscribe();
  }

  private prepareForm() {
    this.formGroup = new FormGroup({
      mainDirectory: new FormControl(''),
      ignoreDirectories: new FormArray([])
    })
  }

  private fillInForm({ mainDirectory }) {
    this.formGroup.controls.mainDirectory.setValue(mainDirectory);
  }

  private handleFormChanges() {
    this.subService.handleDestroy(this.formGroup.controls.mainDirectory.valueChanges)
      .subscribe(data => this.getSubdirectories(data))
  }

  private getSubdirectories(path) {
    this.pathsService.getSubDirectories(path).pipe(take(1)).subscribe((data: string[]) => {
      this.subDirectories$.next(data);
      data.forEach(dir => {
        const isHiddenFile = dir.split('.')[0] === '';
        this.addIgnoreDirectoryInput({ name: dir, checked: isHiddenFile })
      });
    });
  }

  private createIgnoreDirectoriesFormGroup({ name = '', checked = false } = {}): FormGroup {
    return new FormGroup({
      directory: new FormControl(name),
      checked: new FormControl(checked)
    });
  }

  public addIgnoreDirectoryInput(params) {
    (this.formGroup.controls.ignoreDirectories as FormArray)
      .push(this.createIgnoreDirectoriesFormGroup(params))
  }

  public getPath(options) {
    const ignore = this.formGroup.controls.ignoreDirectories.value
      .map(ign => ign.checked ? ign.directory : null)
      .filter(ign => !!ign);

    this.pathsService.getJsonFiles(options, ignore)
      .subscribe(data => this.files$.next(data));
  }

  public setDirectory() {
    this.electronService.pathSelector().then(options => {
      this.formGroup.controls.mainDirectory.setValue(options.filePaths[0]);
      this.localstorageService.setMainDirectory(options.filePaths[0]);
    });
  }
}
