#!/usr/bin/env python3
from __future__ import annotations
import argparse, json
from pathlib import Path
ROOT=Path(__file__).resolve().parent
STAGES=json.loads((ROOT/'icm/config/stages.json').read_text())
def stage_dir(i):
    for s in STAGES:
        if s['id']==i:
            p=list((ROOT/'icm/stages').glob(f"{i}_*"))
            return p[0] if p else None
    return None
def state(i):
    p=stage_dir(i)
    if not p: return 'missing'
    f=p/'STATUS.md'
    if not f.exists(): return 'missing'
    for line in f.read_text().splitlines():
        if line.startswith('state:'): return line.split(':',1)[1].strip()
    return 'unknown'
def main():
    ap=argparse.ArgumentParser(); sub=ap.add_subparsers(dest='cmd',required=True)
    sub.add_parser('status'); sub.add_parser('next')
    a=ap.parse_args()
    if a.cmd=='status':
        print(json.dumps([{'id':s['id'],'slug':s['slug'],'state':state(s['id'])} for s in STAGES],indent=2))
    else:
        for s in STAGES:
            if state(s['id'])!='complete': print(str(stage_dir(s['id']))); return
        print('ALL_COMPLETE')
if __name__=='__main__': main()
