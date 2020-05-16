import { SubHandlerService } from './../core/services/subHandler.service';
import { ElectronService } from './../core/services/electron/electron.service';
import { PathsService } from './../core/services/paths.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SubHandlerService]
})
export class HomeComponent implements OnInit {
  public files$ = new BehaviorSubject(null);
  public formGroup: FormGroup;

  private options = {
    directory: ''
  };

  constructor(
    public pathsService: PathsService,
    private electronService: ElectronService,
    private subService: SubHandlerService
  ) { }

  ngOnInit(): void {
    this.initFilesSubscription();
    this.prepareForm();
    this.formGroup.valueChanges.subscribe(data => {
      console.log(data);
    })
  }

  private createIgnoreDirectoriesFormGroup(defaultValue = ''): FormGroup {
    return new FormGroup({
      directory: new FormControl(defaultValue)
    });
  }

  private prepareForm() {
    this.formGroup = new FormGroup({
      ignoreDirectories: new FormArray([
        this.createIgnoreDirectoriesFormGroup('node_modules')
      ])
    })
  }

  private initFilesSubscription() {
    this.subService.handleDestroy(this.files$).pipe(tap(files => {
      console.log(files);
    })).subscribe();
  }

  public getPath(options) {
    this.pathsService.getJsonFiles(options)
      .subscribe(data => this.files$.next(data));
  }

  public setDirectory() {
    this.electronService.pathSelector().then(options => {
      this.options.directory = options.filePaths[0]
    });
  }

  public addIgnoreDirectoryInput() {
    (this.formGroup.controls.ignoreDirectories as FormArray)
      .push(this.createIgnoreDirectoriesFormGroup())
  }
}
